import torch
import torch.nn as nn
import matplotlib.pyplot as plt
import seaborn as sns
class FeedFoward(nn.Module):
    def __init__(self, n_embd=64,rate = 0.2):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(n_embd, 4 * n_embd),
            nn.ReLU(),
            nn.Linear(4 * n_embd, n_embd),
            nn.Dropout(rate),
        )

    def forward(self, x):
        return self.net(x)
        
class TransfomerBlock(nn.Module):
    def __init__(self,n_embd=64,n_head = 4,rate = 0.2):
        super().__init__()
        self.sa = nn.MultiheadAttention(embed_dim=n_embd, num_heads=n_head, batch_first=True)
        
        self.ffwd = FeedFoward(n_embd)
        
        self.ln1 = nn.LayerNorm(n_embd)
        
        self.ln2 = nn.LayerNorm(n_embd)
        
        self.dropout1 = nn.Dropout(rate)
        
        self.dropout2 = nn.Dropout(rate)
        
    def forward(self, x,padding,is_train = True):
        attention_output,wei = self.sa(query=x,key=x,value =x,key_padding_mask = padding)

        if(is_train==False):     
            attention_weights = wei[0]  
            attention_weights = attention_weights.detach().cpu().numpy()
            # Vẽ heatmap với seaborn
            plt.figure(figsize=(8, 10))
            sns.heatmap(attention_weights, cmap='viridis', annot=True, cbar=True)
            plt.title("Attention Weights Heatmap")
            plt.xlabel("Key Tokens")
            plt.ylabel("Query Tokens")
            plt.show()

        attention_output = self.dropout1(attention_output)
        
        out1 = self.ln1(attention_output + x)
        
        ffwd_output = self.ffwd(out1)
        
        ffwd_output = self.dropout2(ffwd_output)
        
        return self.ln2(out1 + ffwd_output)


class MultiLabelClassifier(nn.Module):
    def __init__(self, vocab_size, sequence_length, output_dim, n_embd=128):
        super().__init__()
        
        self.token_embedding_table = nn.Embedding(vocab_size, n_embd)
        
        self.position_embedding_table = nn.Embedding(sequence_length, n_embd)
        
        self.transfomer = TransfomerBlock(n_embd)
        
        self.avarage_pooling = nn.AdaptiveAvgPool1d(1)
        self.output = nn.Linear(n_embd,output_dim)

    def forward(self,x,padding,is_train = True):
        B,T = x.shape
        
        token_embd = self.token_embedding_table(x)
        pos_embd = self.position_embedding_table(torch.arange(T))
        x = token_embd + pos_embd

        x = self.transfomer(x,padding,is_train)

        # valid_lengths = (~padding).sum(dim=1) - 1
        # x = x[torch.arange(x.size(0)), valid_lengths]

        mask = (~padding).unsqueeze(-1).float()

        x_masked = x * mask

        # x = x.transpose(1,2)

        # x = self.avarage_pooling(x)

        # x = x.transpose(1,2)

        sum_x = x_masked.sum(dim=1)
        
        count = mask.sum(dim=1).clamp(min=1)
        
        mean_x = sum_x / count

        x = mean_x

        x = self.output(x)

        x = x.squeeze(1)

        x = torch.sigmoid(x)
        return x
    