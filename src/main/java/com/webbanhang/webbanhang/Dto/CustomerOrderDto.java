package com.webbanhang.webbanhang.Dto;


public class CustomerOrderDto {
    private String productId;
    private String productName;
    private String status;
    private Integer productPrice;
    private String address;
    private Integer productQuantity;
    private String imagePath;
    public CustomerOrderDto(String productId, String productName, String status, Integer productPrice, String address,
        Integer productQuantity, String imagePath) {
        this.productId = productId;
        this.productName = productName;
        this.status = status;
        this.productPrice = productPrice;
        this.address = address;
        this.productQuantity = productQuantity;
        this.imagePath = imagePath;
    }
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    }
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Integer getProductPrice() {
        return productPrice;
    }
    public void setProductPrice(Integer productPrice) {
        this.productPrice = productPrice;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public Integer getProductQuantity() {
        return productQuantity;
    }
    public void setProductQuantity(Integer productQuantity) {
        this.productQuantity = productQuantity;
    }
    public String getImagePath() {
        return imagePath;
    }
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
   
    
}
