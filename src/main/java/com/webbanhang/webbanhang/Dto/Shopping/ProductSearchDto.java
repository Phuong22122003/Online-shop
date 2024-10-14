package com.webbanhang.webbanhang.Dto.Shopping;

import java.util.Set;

public class ProductSearchDto extends ProductDto {
    private Set<String> colors;
    private Set<String> sizes;
    private Integer categoryId;
    public ProductSearchDto(){
    }

    public Set<String> getColors() {
        return colors;
    }

    public void setColors(Set<String> colors) {
        this.colors = colors;
    }

    public Set<String> getSizes() {
        return sizes;
    }

    public void setSizes(Set<String> sizes) {
        this.sizes = sizes;
    }

    public Integer getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
    
}
