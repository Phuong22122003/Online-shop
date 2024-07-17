package com.webbanhang.webbanhang.Entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Embeddable;

@Embeddable
public class SELLING_DETAIL_KEY implements Serializable{
    private Integer clientId;
    private String productId;
    private LocalDateTime sellingDate;
    public SELLING_DETAIL_KEY() {
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
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    }
    public LocalDateTime getSellingDate() {
        return sellingDate;
    }
    public void setSellingDate(LocalDateTime sellingDate) {
        this.sellingDate = sellingDate;
    }

    
}
