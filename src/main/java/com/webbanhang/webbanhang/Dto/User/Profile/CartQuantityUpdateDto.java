package com.webbanhang.webbanhang.Dto.User.Profile;

public class CartQuantityUpdateDto {
    private Integer productVariantId;
    private Integer quantity;
    private String email;
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
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    
}
