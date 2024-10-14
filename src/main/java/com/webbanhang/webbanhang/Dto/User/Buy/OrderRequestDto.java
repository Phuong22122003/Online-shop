package com.webbanhang.webbanhang.Dto.User.Buy;

public class OrderRequestDto {
    private Integer productVariantId;
    private Integer quantity;
    private Float price;
    public Integer getProductVariantId() {
        return productVariantId;
    }
    public void setProductVariantId(Integer productVariantId) {
        this.productVariantId = productVariantId;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public Float getPrice() {
        return price;
    }
    public void setPrice(Float price) {
        this.price = price;
    }
    
}
