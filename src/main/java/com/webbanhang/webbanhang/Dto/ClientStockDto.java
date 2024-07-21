package com.webbanhang.webbanhang.Dto;


public class ClientStockDto {
    private String productId;
    private String imagePath;
    private String name;
    private Integer price;
    private Integer quantity;
    

    public ClientStockDto(String productId, String imagePath, String name, Integer price, Integer quantity) {
        this.productId = productId;
        this.imagePath = imagePath;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    public String getImagePath() {
        return imagePath;
    }
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getPrice() {
        return price;
    }
    public void setPrice(Integer price) {
        this.price = price;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    }
        
}
