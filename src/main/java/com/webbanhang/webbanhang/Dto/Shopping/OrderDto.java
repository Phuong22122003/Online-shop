package com.webbanhang.webbanhang.Dto.Shopping;

import java.time.LocalDate;
import java.util.List;

// dành cho admin xem order => đưa vào admin
public class OrderDto {
    private Integer orderId;
    private String deliveryOrderId;
    private String status;
    private Double deliveryFee;
    private LocalDate purchasingDate;
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
    public LocalDate getPurchasingDate() {
        return purchasingDate;
    }
    public void setPurchasingDate(LocalDate purchasingDate) {
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
    public String getDeliveryOrderId() {
        return deliveryOrderId;
    }
    public void setDeliveryOrderId(String deliveryOrderId) {
        this.deliveryOrderId = deliveryOrderId;
    }

    
}
