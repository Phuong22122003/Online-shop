package com.webbanhang.webbanhang.Dto.Delivery.DeliveryFee;


public class ApiResponse {
    private int code;
    private String message;
    private DataResponse data;
    public int getCode() {
        return code;
    }
    public void setCode(int code) {
        this.code = code;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public DataResponse getData() {
        return data;
    }
    public void setData(DataResponse data) {
        this.data = data;
    }

}
