package com.webbanhang.webbanhang.Dto.User.Profile;

public class Order {
    private Integer OrderDetailId;
    private String imagePath;
    private Integer productId;
    private String name;
    private String size;
    private String color;
    private Integer quantity;
    private Double price;
    private Boolean isCommented;
    public String getImagePath() {
        return imagePath;
    }
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
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
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public Integer getOrderDetailId() {
        return OrderDetailId;
    }
    /**
     * OrderDetailId === PurchaseHistoryDetailId using for comment
     * @param orderDetailId
     */
    public void setOrderDetailId(Integer orderDetailId) {
        OrderDetailId = orderDetailId;
    }
    public Boolean getIsCommented() {
        return isCommented;
    }
    public void setIsCommented(Boolean isCommented) {
        this.isCommented = isCommented;
    }
    public Integer getProductId() {
        return productId;
    }
    public void setProductId(Integer productId) {
        this.productId = productId;
    }
    
}
