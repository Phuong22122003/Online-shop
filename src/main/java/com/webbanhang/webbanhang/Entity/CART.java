package com.webbanhang.webbanhang.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "CART")
@IdClass(CART_KEY.class)
public class CART {
@Id
    @Column(name = "CLIENT_ID")
    private Integer clientId;

    @Id
    @Column(name = "PRODUCT_ID")
    private String productId;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "QUANTITY")
    private Integer quantity;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "CLIENT_ID")
    private CLIENT_INFO clientInfo;

    @MapsId
    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private PRODUCT product;

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

    public PRODUCT getProduct() {
        return product;
    }

    public void setProduct(PRODUCT product) {
        this.product = product;
    }
    
}
