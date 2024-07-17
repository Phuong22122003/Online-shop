package com.webbanhang.webbanhang.Dto;

import org.springframework.stereotype.Component;

@Component
public class ProductInfoDto {
    private String imagePath;
    private String productId;
    private String name;
    private Integer price;
    public ProductInfoDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ProductInfoDto(String imagePath, String productId, String name, Integer price) {
        this.imagePath = imagePath;
        this.productId = productId;
        this.name = name;
        this.price = price;
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
    
}
