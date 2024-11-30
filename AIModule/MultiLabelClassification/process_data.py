import pandas as pd
import torch
import re
import ast
class ProcessData():
    # đọc dữ liệu
    def __init__(self, max_length=10):  # Thêm max_length
        self.vocabulary_decoder = {}
        self.labels_decoder = {}
        self.vocabulary_encoder = {}
        self.labels_encoder = {}
        self.max_length = max_length  # Lưu max_length làm thuộc tính
        self.genders = set()
        self.sizes = set()
        self.colors = set()
        self.subcategoies = set()

    # gán dữ liệu và khởi tạo
    def set_data(self,data):
        self.raw_data = data
        self.init()

    #Đọc từ file csv
    def load_raw_data(self,path):
        self.raw_data = pd.read_csv(path)
        self.init()

    #Load lại dữ liệu đã train
    def load_saved_data(self,vocab_encoder:dict,label_encoder:dict,subcategories:set,colors:set,sizes:set,genders:set):
        self.labels_encoder = label_encoder
        self.vocabulary_encoder =vocab_encoder
        self.vocabulary_decoder = {v: k for k, v in vocab_encoder.items()}
        self.labels_decoder = {v: k for k, v in label_encoder.items()}
        self.genders = genders
        self.subcategoies = subcategories
        self.colors = colors
        self.sizes = sizes

    @staticmethod
    def split_text(text):
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text, flags=re.UNICODE)
        text = text.split()
        return text
    
    @staticmethod
    def split_labels(labels):
        labels = labels.lower()
        labels = re.sub(r'[\[\]"]', '', labels, flags=re.UNICODE)
        # label = label.replace('"',' ')
        labels = [l.strip() for l in labels.split(',') if l !='']
        if len(labels) == 1 and '' in labels:
            return []
        return labels
    
    def init(self):
        vocab = set()
        labels = set()
        for index, row in self.raw_data.iterrows():
            text = row.iloc[0]
            text = self.split_text(text)
            
            subcategories = row.iloc[1]
            colors = row.iloc[2]
            sizes = row.iloc[3]
            genders = row.iloc[4]

            subcategories = self.split_labels(subcategories)
            colors = self.split_labels(colors)
            sizes = self.split_labels(sizes)
            genders = self.split_labels(genders)
            if(len(subcategories) >0):
                self.subcategoies.update(subcategories)
            if(len(colors)>0):
                self.colors.update(colors)
            if(len(sizes)>0):
                self.sizes.update( sizes)
            if(len(genders)>0):
                self.genders.update( genders)
            vocab.update(text)
            labels.update(subcategories)
            labels.update(colors)
            labels.update(sizes)
            labels.update(genders)

        vocab = ['UNK']+ sorted(list(vocab)) + ['<PAD>']
        labels = sorted(list(labels)) 
        
        for index, value in enumerate(vocab):
            if(value.strip()==''):continue
            self.vocabulary_encoder[value.strip()] = index
            self.vocabulary_decoder[index] = value.strip()
        for index, value in enumerate(labels):
            if(value.strip() == ''):continue
            self.labels_encoder[value.strip()] = index
            self.labels_decoder[index] = value.strip()
    
    def get_vocab_size(self):
        return len(self.vocabulary_decoder)
    
    def get_labels_size(self):
        return len(self.labels_decoder)
    def decode_labels(self, encoded_labels):
        # Giải mã chỉ số thành nhãn
        encoded_labels = encoded_labels.tolist() if isinstance(encoded_labels, torch.Tensor) else encoded_labels
        return [self.labels_decoder.get(idx+1, "") for idx,probabilaty in enumerate(encoded_labels) if probabilaty==1]
    def encode_text(self, text):
        # Mã hóa văn bản thành chỉ số và thêm padding nếu cần
        padding = [0]*self.max_length
        text = self.split_text(text)
        encoded_text = [self.vocabulary_encoder.get(t, 0) for t in text]  # Sử dụng 0 cho từ không tìm thấy
        
        # Padding văn bản nếu ngắn hơn max_length
        if len(encoded_text) < self.max_length:
            padding[len(encoded_text):] = [1]*len(padding[len(encoded_text):])
            encoded_text += [self.vocabulary_encoder['<PAD>']] * (self.max_length - len(encoded_text))
        else:
            encoded_text = encoded_text[:self.max_length]  # Cắt văn bản nếu dài hơn max_length
        return torch.tensor(encoded_text, dtype=torch.long),torch.tensor(padding).to(torch.bool)
    
    def decode_text(self, encoded_text):
        encoded_text = encoded_text.tolist() if isinstance(encoded_text, torch.Tensor) else encoded_text
        # Giải mã chỉ số thành văn bản
        return " ".join([self.vocabulary_decoder.get(idx, "") for idx in encoded_text])
    
    def get_data(self):
        inputs = []
        targets = []
        paddings = []
        for index, row in self.raw_data.iterrows():
            text = row.iloc[0]
            label = f'{row.iloc[1]}, {row.iloc[2]} , {row.iloc[3]} , {row.iloc[4]}'
            
            # Mã hóa các từ trong văn bản thành chỉ số
            x,padding = self.encode_text(text)
            
            # Mã hóa nhãn
            y = [0] * self.get_labels_size()
            for lbl in self.split_labels(label):
                if lbl.strip() in self.labels_encoder:
                    y[self.labels_encoder[lbl.strip()]-1] = 1
            # Chuyển y thành tensor trước khi thêm vào
            targets.append(torch.tensor(y, dtype=torch.float))
            inputs.append(x)
            paddings.append(padding)
            # targets.append(y)
        
        inputs = torch.stack(inputs)  # Chuyển thành tensor batch
        targets = torch.stack(targets)
        paddings = torch.stack(paddings)
        return inputs,paddings, targets
    

if __name__ == "__main__":
    textProcessing = ProcessData(max_length=10)
    textProcessing.load_raw_data(r'D:\WorkSpace\Source\webbanhang\AIModule\data.csv')
    print(textProcessing.labels_decoder)
    # Lấy dữ liệu đã được mã hóa
    inputs,paddings, targets = textProcessing.get_data()
    print("Inputs:\n", inputs)
    print("Targets:\n", targets)
    print('padding:\n',paddings)
    
    # Giải mã một văn bản
    example_text = "Tôi cần mua quần dài"
    encoded_text,_ = textProcessing.encode_text(example_text)
    print("Encoded text:", encoded_text)
    
    decoded_text = textProcessing.decode_text(encoded_text)
    print("Decoded text:", decoded_text)
