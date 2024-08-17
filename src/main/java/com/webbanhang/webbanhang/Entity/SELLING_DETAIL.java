package com.webbanhang.webbanhang.Entity;

import java.time.LocalDateTime;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "SELLING_DETAIL")
@IdClass(SELLING_DETAIL_KEY.class)
public class SELLING_DETAIL {
    
    @Id
    @Column(name = "CLIENT_ID")
    private Integer clientId;

    @Id
    @Column(name = "PRODUCT_ID")
    private String productId;
    @Id
    @Column(name = "SELLING_DATE")
    private LocalDateTime sellingDate;

    @Column(name = "ADDRESS")
    @NotBlank(message = "Address is empty")
    private String address;

    @Column(name = "QUANTITY")
    private Integer quantity;

    @Column(name = "PRICE")
    private Integer price;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "CLIENT_ID")
    private CLIENT_INFO clientInfo;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private PRODUCT product;

    @Column(name = "STATUS")
    private String status;
    
    public SELLING_DETAIL() {
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }


    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public PRODUCT getProduct() {
        return product;
    }

    public void setProduct(PRODUCT product) {
        this.product = product;
    }

    public LocalDateTime getSellingDate() {
        return sellingDate;
    }

    public void setSellingDate(LocalDateTime sellingDate) {
        this.sellingDate = sellingDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public CLIENT_INFO getClientInfo() {
        return clientInfo;
    }

    public void setClientInfo(CLIENT_INFO clientInfo) {
        this.clientInfo = clientInfo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
    
}
