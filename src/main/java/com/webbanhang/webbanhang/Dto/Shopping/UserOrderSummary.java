package com.webbanhang.webbanhang.Dto.Shopping;

public class UserOrderSummary {
    private Integer productVariantId;
    private String name;
    private Double unitPrice;
    private String imagePath;
    private String size;
    private String color;
    private Double subTotal;
    private Integer quantity;
    
    public Integer getProductVariantId() {
        return productVariantId;
    }
    public void setProductVariantId(Integer productVariantId) {
        this.productVariantId = productVariantId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Double getUnitPrice() {
        return unitPrice;
    }
    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }
    public String getImagePath() {
        return imagePath;
    }
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
    public String getSize() {
        return size;
    }
    public void setSize(String size) {
        this.size = size;
    }
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
    public Double getSubTotal() {
        return subTotal;
    }
    public void setSubTotal(Double subTotal) {
        this.subTotal = subTotal;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    
}
