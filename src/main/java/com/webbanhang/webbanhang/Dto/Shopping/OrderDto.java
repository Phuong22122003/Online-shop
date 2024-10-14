package com.webbanhang.webbanhang.Dto.Shopping;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {
    private Integer orderId;
    private String status;
    private Double deliveryFee;
    private LocalDateTime purchasingDate;
    private String address;
    private String phone;
    private String fullname;
    private List<ProductOrderDto> products;
    public Integer getOrderId() {
        return orderId;
    }
    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Double getDeliveryFee() {
        return deliveryFee;
    }
    public void setDeliveryFee(Double deliveryFee) {
        this.deliveryFee = deliveryFee;
    }
    public LocalDateTime getPurchasingDate() {
        return purchasingDate;
    }
    public void setPurchasingDate(LocalDateTime purchasingDate) {
        this.purchasingDate = purchasingDate;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getFullname() {
        return fullname;
    }
    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
    public List<ProductOrderDto> getProducts() {
        return products;
    }
    public void setProducts(List<ProductOrderDto> products) {
        this.products = products;
    }

    
}
