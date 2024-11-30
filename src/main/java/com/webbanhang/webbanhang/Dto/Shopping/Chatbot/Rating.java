package com.webbanhang.webbanhang.Dto.Shopping.Chatbot;

public class Rating {
    private String question;
    private String answer;
    private String label;
    public String getQuestion() {
        return question;
    }
    public Rating(String question, String answer, String label) {
        this.question = question;
        this.answer = answer;
        this.label = label;
    }
    public void setQuestion(String question) {
        this.question = question;
    }
    public String getAnswer() {
        return answer;
    }
    public void setAnswer(String answer) {
        this.answer = answer;
    }
    public String getLabel() {
        return label;
    }
    public void setLabel(String label) {
        this.label = label;
    }
    
}
