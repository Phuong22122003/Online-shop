package com.webbanhang.webbanhang.Dto;

import org.springframework.stereotype.Component;

@Component
public class CartDto {
    private String imagePath;
    private String productId;
    private String name;
    private Integer price;
    private Integer quantity;
    private String address;
    public CartDto() {
    }

    public CartDto(String imagePath, String productId, String name, String address,Integer price, Integer quantity) {
        this.imagePath = imagePath;
        this.productId = productId;
        this.name = name;
        this.address = address;
        this.price = price;
        this.quantity = quantity;
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

    public String getImagePath() {
        return imagePath;
    }
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    
}
