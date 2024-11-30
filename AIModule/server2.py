import urllib.parse
from flask import Flask, jsonify, request,render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from datetime import datetime
import requests
from datasets import Dataset
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import torch
from torch.utils.data import DataLoader
import torch
import re




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

class ChatDataset(db.Model):
    __tablename__ = 'ChatDataset'
    Id = db.Column(db.Integer, primary_key = True)
    Question = db.Column(db.Unicode(1024))
    Answer = db.Column(db.Unicode(1024))
    Label = db.Column(db.Unicode(50))

    def __init__(self,Question, Answer, Label):
        super().__init__()
        self.Question = Question
        self.Answer = Answer
        self.Label = Label

def remove_sentences_with_patterns(text):
    # Các regex để phát hiện email, số điện thoại, và URL
    email_pattern = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
    phone_pattern = r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4}|\d{4}[-\.\s]??\d{3}[-\.\s]??\d{3})'
    url_pattern = r"\b(?:https?://|www\.)\S+\b"
    
    # Tách văn bản thành các câu
    sentences = re.split(r'(?<=[.!?])\s+', text)
    # Giữ lại các câu không khớp với bất kỳ mẫu nào
    filtered_sentences = [
        sentence for sentence in sentences
        if not (re.search(email_pattern, sentence) or 
                re.search(phone_pattern, sentence) or 
                re.search(url_pattern, sentence))
    ]
    print(filtered_sentences)
    filtered_sentences = filtered_sentences[:2]
    # Gộp lại thành văn bản sau khi lọc
    return ' '.join(filtered_sentences)
@app.route('/chat',methods = ['POST'])
def chat():
    json = request.get_json()
    message = json['message']
    input_text = f"Hỏi: {message}? Trả lời:"
    inputs = tokenizer(input_text, return_tensors="pt").to(device)

    model.eval()
    outputs = model.generate(
        inputs['input_ids'],
        pad_token_id=tokenizer.pad_token_id,
        do_sample=True,
        max_length=64,
        min_length=10,
        top_k=40,
        num_beams=5,
        early_stopping=True,
        no_repeat_ngram_size=2,
        # num_return_sequences=1
    )

    response = ""
    generated_texts = [tokenizer.decode(output, skip_special_tokens=True) for output in outputs]

    for i, text in enumerate(generated_texts):
        print('Gốc: ',text)
        text = text.split('|')[0]
        if('Trả lời:' in text):
            text = text.split('Trả lời:')[1]
        response = text
        print(f"Generated Text {i+1}:\n{text}.")
        break
    response = remove_sentences_with_patterns(response)
    if('Trả lời:' in response):
        print(response.split('Trả lời:'))
        response = response.split('Trả lời:')[1]
    return jsonify({'message': response})
    
@app.route('/save-rating',methods = ['POST','GET'])
def save_rating():
    json = request.get_json()
    data = json['rating']
    question = str(data['question'])
    answer = str(data['answer'])
    label = str(data['label'])
    
    conversation = ChatDataset(Question=question,Answer= answer,Label= label)
    db.session.add(conversation)
    db.session.commit()
    print(json)
    return jsonify({"status": "success", "message": "Rating saved successfully!"}), 200
if __name__ == '__main__':
    model = GPT2LMHeadModel.from_pretrained('D:\WorkSpace\Source\webbanhang\AIModule\FineturingModel\V5')
    tokenizer = GPT2Tokenizer.from_pretrained('D:\WorkSpace\Source\webbanhang\AIModule\FineturingModel\V5')
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    model.eval()
    app.run(debug=True,host='0.0.0.0', port=5000)
