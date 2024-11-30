# import module
# import torch
# import torch.nn as nn
# import process_data
# import torch.optim as optim

# if __name__ == '__main__':

#     sequence_length = 20

#     path = r'data.csv'

#     dataset = process_data.ProcessData(max_length=sequence_length)

#     dataset.load_raw_data(path)

#     model = module.MultiLabelClassifier(sequence_length=sequence_length,vocab_size=dataset.get_vocab_size(),output_dim=dataset.get_label_size())
#     X_tensor,padding,y_tensor = dataset.get_data()
#     y_tensor = y_tensor.float()
#     criterion = nn.BCELoss() 
#     optimizer = optim.Adam(model.parameters(), lr=0.01)
#     epochs = 100
#     model.train()
#     for epoch in range(epochs):
#         optimizer.zero_grad()
#         outputs = model(X_tensor,padding)
#         loss = criterion(outputs, y_tensor)
#         loss.backward()
#         optimizer.step()
#         if (epoch+1) % 10 == 0:
#             print(f"Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}")
#     checkpoint = {
#         'vocab':dataset.vocabulary_encoder,
#         'labels':dataset.label_encoder,
#         'model_state_dict':model.state_dict(),
#         'max_length':sequence_length,
#         'genders': dataset.genders,
#         'colors': dataset.colors,
#         'subcategories': dataset.subcategoies,
#         'sizes':dataset.sizes,
#     }
    
#     torch.save(checkpoint,'checkpoint.pth')
#     model.eval()


#     for i in range(1):
#         t = input()
#         x,padding =dataset.encode_text(t)
#         padding = padding.unsqueeze(0)
#         print(f'X sau khi decode{x}')
#         x = x.unsqueeze(0)
#         x = model(x,padding,is_train = False)
#         x = x.squeeze()
#         x = (x > 0.5).int()
#         print(f'output: {x}')
#         print(dataset.decode_label(x))