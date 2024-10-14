package com.webbanhang.webbanhang.Dto.Admin.Management.AddProduct;

import java.util.List;

/*
 * Use to get request from api and save new products
 */
public class ProductAddRequestDto  {
    private String name;
    private String description;
    private Integer mainCategory;
    private Integer subCategory;
    private List<String> sizes;
    private List<ColorAddRequestDto> colors;
    private List<ProductVariantAddRequestDto> productVariants;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Integer getMainCategory() {
        return mainCategory;
    }
    public void setMainCategory(Integer mainCategory) {
        this.mainCategory = mainCategory;
    }
    public Integer getSubCategory() {
        return subCategory;
    }
    public void setSubCategory(Integer subCategory) {
        this.subCategory = subCategory;
    }
    public List<String> getSizes() {
        return sizes;
    }
    public void setSizes(List<String> sizes) {
        this.sizes = sizes;
    }
    public List<ColorAddRequestDto> getColors() {
        return colors;
    }
    public void setColors(List<ColorAddRequestDto> colors) {
        this.colors = colors;
    }
    public List<ProductVariantAddRequestDto> getProductVariants() {
        return productVariants;
    }
    public void setProductVariants(List<ProductVariantAddRequestDto> productVariants) {
        this.productVariants = productVariants;
    }


    
}
/*
 * "{
    * "name":"a",
    * "description":"a",
    * "mainCategory":2,
    * "subCategory":6,
    * "sizes":["a"],
    * "colors":[{"name":"a","imageName":"color0.jpg"}],
    * "productVariants":[{"size":"a","color":"a","price":1,"quantity":1}]
 * }"
 */