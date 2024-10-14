package com.webbanhang.webbanhang.Dto.User.Profile;

import java.util.List;

import com.webbanhang.webbanhang.Entity.Address;


public class UserOrdersDto {
    private Integer orderId;
    private String status;
    private Double deliveryFee;
    private Double grandTotal;
    private List<Order> orders;
    private Address address;
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
    public List<Order> getOrders() {
        return orders;
    }
    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
    public Double getDeliveryFee() {
        return deliveryFee;
    }
    public void setDeliveryFee(Double deliveryFee) {
        this.deliveryFee = deliveryFee;
    }
    public Double getGrandTotal() {
        return grandTotal;
    }
    public void setGrandTotal(Double grandTotal) {
        this.grandTotal = grandTotal;
    }
    public Address getAddress() {
        return address;
    }
    public void setAddress(Address address) {
        this.address = address;
    }
       
}
