package com.webbanhang.webbanhang.Dto.User.Buy;

import java.util.List;

import com.webbanhang.webbanhang.Entity.PurchaseHistoryDetail;

public class BuyRequestDto {
    private String email;
    private Integer addressId;
    private Integer deliveryFee;
    private List<PurchaseHistoryDetail> purchaseHistoryDetails;
    public Integer getAddressId() {
        return addressId;
    }
    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }
    public Integer getDeliveryFee() {
        return deliveryFee;
    }
    public void setDeliveryFee(Integer deliveryFee) {
        this.deliveryFee = deliveryFee;
    }
    public List<PurchaseHistoryDetail> getPurchaseHistoryDetails() {
        return purchaseHistoryDetails;
    }
    public void setPurchaseHistoryDetails(List<PurchaseHistoryDetail> purchaseHistoryDetails) {
        this.purchaseHistoryDetails = purchaseHistoryDetails;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    
}
