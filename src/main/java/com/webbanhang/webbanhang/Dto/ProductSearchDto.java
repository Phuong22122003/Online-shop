package com.webbanhang.webbanhang.Dto;

import java.util.List;
import java.util.Set;

public class ProductSearchDto extends ProductDto {
    private Set<Integer> colors;
    private Set<Integer> sizes;
    private Integer categoryId;
    public ProductSearchDto(){
    }
    public Set<Integer> getColors() {
        return colors;
    }
    public void setColors(Set<Integer> colors) {
        this.colors = colors;
    }
    public Set<Integer> getSizes() {
        return sizes;
    }
    public void setSizes(Set<Integer> sizes) {
        this.sizes = sizes;
    }
    public Integer getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
    
}
