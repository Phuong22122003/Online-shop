package com.webbanhang.webbanhang.Dto.Shopping;

public class ProductVariantDto {
    private Integer id;
    private Integer colorId;
    private Integer sizeId;
    private Double price;
    private Integer quantity;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getColorId() {
        return colorId;
    }
    public void setColorId(Integer colorId) {
        this.colorId = colorId;
    }
    public Integer getSizeId() {
        return sizeId;
    }
    public void setSizeId(Integer sizeId) {
        this.sizeId = sizeId;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    
}
