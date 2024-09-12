package com.webbanhang.webbanhang.Entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class CartKey {
    private String email;
    private Integer productVariantId;
    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Integer getProductVariantId() {
        return productVariantId;
    }
    public void setProductVariantId(Integer productVariantId) {
        this.productVariantId = productVariantId;
    }
    
}
