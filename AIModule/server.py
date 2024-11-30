import urllib.parse
from flask import Flask, jsonify, request,render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from datetime import datetime
import requests

import torch
import AIModule.MultiLabelClassification.module as module
import AIModule.MultiLabelClassification.process_data as process_data


db = SQLAlchemy()

app = Flask(__name__,template_folder='templates')

# Thông tin kết nối tới SQL Server
username = 'sa'  # Thay thế bằng tên người dùng SQL Server của bạn
password = '123456789'  # Thay thế bằng mật khẩu của bạn
server = 'PHUONG'  # Địa chỉ SQL Server (localhost hoặc IP)
database = 'Shopping_Ecommerce'  # Thay thế bằng tên cơ sở dữ liệu

# Mã hóa các tham số trong chuỗi kết nối
params = urllib.parse.quote_plus(
    f"DRIVER={{ODBC Driver 17 for SQL Server}};"
    f"SERVER={server};"
    f"DATABASE={database};"
    f"UID={username};"
    f"PWD={password};"
    f"CHARSET=UTF8;Unicode=True"
)

# # Cấu hình chuỗi kết nối SQLAlchemy cho SQL Server
app.config['SQLALCHEMY_DATABASE_URI'] = f"mssql+pyodbc:///?odbc_connect={params}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# initialize the app with Flask-SQLAlchemy
db.init_app(app)


class Description(db.Model):
    __tablename__ = 'Descriptions'
    Id = db.Column(db.Integer, primary_key = True)
    Description = db.Column(db.Unicode(1000))
    SubCategories = db.Column(db.Unicode(1000))
    Colors = db.Column(db.Unicode(1000))
    Sizes = db.Column(db.Unicode(1000))
    Genders = db.Column(db.Unicode(1000))
    def __init__(self,Description, SubCategories, Colors, Sizes, Genders):
        super().__init__()
        self.SubCategories = SubCategories
        self.Colors = Colors
        self.Description = Description
        self.Genders = Genders
        self.Sizes = Sizes

class Recomendation():
    def __init__(self):
        self.is_spam = False
        self.genders = []
        self.color_options = []
        self.size_options = []
        self.subcategories = []
    def set_genders(self,genders):
        self.genders = genders
    def set_color_options(self,color_options):
        self.color_options = color_options
    def set_size_options(self,size_options):
        self.size_options = size_options
    def set_subcategories(self,subcategories):
        self.subcategories = subcategories
    def set_is_spam(self,is_spam):
        self.is_spam = is_spam

    def to_dict(self):
        dictionary = {
            'is_spam':self.is_spam,
            'genders':self.genders,
            'colorOptions':self.color_options,
            'sizeOptions':self.size_options,
            'subCategories':self.subcategories
        }
        print(dictionary)
        return dictionary
@app.route('/save-rating',methods = ['POST'])
def save_rating():
    json = request.get_json()
    data = json['rating-request']
    description = str(data['description'])
    subcategories = str(data['subCategoryLabels'])
    print('daa',subcategories)
    colors = str(data['colorLabels'])
    sizes = str(data['sizeLabels'])
    genders = str(data['genderLabels'])
    
    des = Description(Description=description,SubCategories=subcategories,Colors=colors,Genders=genders,Sizes=sizes)
    db.session.add(des)
    db.session.commit()
    print(json)
    return jsonify({"status": "success", "message": "Rating saved successfully!"}), 200
@app.route('/search',methods = ['POST','GET'])
def get():
    recomendation = Recomendation()

    json = request.get_json()

    description = json['description']

    print(description)

    token, padding =dataset.encode_text(description)
    padding = padding.unsqueeze(0)
    print(f'X sau khi decode{token}')
    #Mở rộng thêm một chiều
    token = token.unsqueeze(0)
    token = model(token,padding,is_train = None)
    token = token.squeeze()
    token = (token > 0.5).int()
    print(f'output: {token}')
    labels =dataset.decode_labels(token)

    print(labels)
    if 'spam' in labels:
        recomendation.set_is_spam(True)
    else:
        print(genders)
        print(colors)
        print(sizes)
        print(subcategories)
        gender_options = []
        color_options = []
        size_options = []
        _subcategories = []
        for label in labels:
            if(label in colors):
                color_options.append(label)
            elif label in subcategories:
                _subcategories.append(label)
            elif label in sizes:
                size_options.append(label)
            elif label in genders:
                gender_options.append(label)
        
        recomendation.set_color_options(color_options)
        recomendation.set_genders(gender_options)
        recomendation.set_size_options(size_options)
        recomendation.set_subcategories(_subcategories)

    return jsonify(recomendation.to_dict())

if __name__ == '__main__':

    checkpoint = torch.load('D:\WorkSpace\Source\webbanhang\AIModule\checkpoint1.pth')

    max_length = checkpoint['max_length']
    vocab_encoder = checkpoint['vocab']
    label_encoder = checkpoint['labels']
    genders =  checkpoint['genders']
    colors = checkpoint['colors']
    sizes = checkpoint['sizes']
    subcategories = checkpoint['subcategories']
    dataset = process_data.ProcessData(max_length=max_length)
    dataset.load_saved_data(vocab_encoder=vocab_encoder,label_encoder=label_encoder,subcategories=subcategories,colors=colors,sizes=sizes,genders=genders)
    state_dict = checkpoint['model_state_dict']
    
    model = module.MultiLabelClassifier(sequence_length=max_length,vocab_size=dataset.get_vocab_size(),output_dim=dataset.get_labels_size())
    model.load_state_dict(state_dict)

    model.eval()
    app.run(debug=True,host='0.0.0.0', port=5000)
