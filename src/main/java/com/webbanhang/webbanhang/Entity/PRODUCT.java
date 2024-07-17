package com.webbanhang.webbanhang.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Collection;
@Entity
@Table(name = "PRODUCT")
public class PRODUCT {
    @Id
    @Column(name = "PRODUCT_ID")
    private String productId;
    @Column(name = "PRODUCT_NAME")
    private String name;
    @Column(name = "PRODUCT_IMAGE_PATH")
    private String imagePath;
    @Column(name = "PRODUCT_REMAINING_QUANTITY")
    private Integer quantity;
    @Column(name = "PRODUCT_DESCRIPTION")
    private String description;
    @Column(name = "PRICE")
    private Integer price;
    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY)
    private Collection<SELLING_DETAIL> sellingDetails;

    public PRODUCT() {
    }
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    }
    public Integer getPrice() {
        return price;
    }
    public void setPrice(Integer price) {
        this.price = price;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getImagePath() {
        return imagePath;
    }
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Collection<SELLING_DETAIL> getSellingDetails() {
        return sellingDetails;
    }
    public void setSellingDetails(Collection<SELLING_DETAIL> sellingDetails) {
        this.sellingDetails = sellingDetails;
    }    
    
}
