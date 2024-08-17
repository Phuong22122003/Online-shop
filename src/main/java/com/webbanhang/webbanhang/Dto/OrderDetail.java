package com.webbanhang.webbanhang.Dto;

public class OrderDetail {
    private Double clientId;
    private String purchasingDate;
    private Double unitPrice;
    private Double quantity;
    private String status;
    private Double total;
    private String productName;
    private String productId;
    public OrderDetail(){
       
    }
    public Double getClientId() {
        return clientId;
    }
    public void setClientId(Double clientId) {
        this.clientId = clientId;
    }
    public String getPurchasingDate() {
        return purchasingDate;
    }
    public void setPurchasingDate(String purchasingDate) {
        this.purchasingDate = purchasingDate;
    }
    public Double getUnitPrice() {
        return unitPrice;
    }
    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }
    public Double getQuantity() {
        return quantity;
    }
    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Double getTotal() {
        return total;
    }
    public void setTotal(Double total) {
        this.total = total;
    }
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    };
    
}
