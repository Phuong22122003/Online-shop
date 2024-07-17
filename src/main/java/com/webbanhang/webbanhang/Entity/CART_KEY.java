package com.webbanhang.webbanhang.Entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class CART_KEY implements Serializable{
    private Integer clientId;
    private String productId;
    
    public CART_KEY() {
    }
    public Integer getClientId() {
        return clientId;
    }
    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }
    public String getProductDetailId() {
        return productId;
    }
    public void setProductDetailId(String productId) {
        this.productId = productId;
    }
}
