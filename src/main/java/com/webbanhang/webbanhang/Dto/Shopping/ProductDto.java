package com.webbanhang.webbanhang.Dto.Shopping;

public class ProductDto {
    private Integer Id;
    private String name;
    private String imagePath;
    private String description;
    private String price;
    private Boolean deletedFlat;
    private Integer remainingQuantity;
    public ProductDto() {
    }
    public Integer getId() {
        return Id;
    }
    public void setId(Integer Id) {
        this.Id = Id;
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
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getPrice() {
        return price;
    }
    public void setPrice(String price) {
        this.price = price;
    }
    public Boolean getDeletedFlat() {
        return deletedFlat;
    }
    public void setDeletedFlat(Boolean deletedFlat) {
        this.deletedFlat = deletedFlat;
    }
    public Integer getRemainingQuantity() {
        return remainingQuantity;
    }
    public void setRemainingQuantity(Integer remainingQuantity) {
        this.remainingQuantity = remainingQuantity;
    }


    
}
