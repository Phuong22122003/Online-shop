package com.webbanhang.webbanhang.Dto;

import java.util.List;

import com.webbanhang.webbanhang.Entity.Color;
import com.webbanhang.webbanhang.Entity.Size;

public class SearchDto {
    private List<ProductSearchDto> products;
    private List<Color> colors;
    private List<Size> sizes;
    public List<MainCategoryDto> categories;
    public SearchDto(){
    }
   
    public List<Color> getColors() {
        return colors;
    }
    public void setColors(List<Color> colors) {
        this.colors = colors;
    }
    public List<Size> getSizes() {
        return sizes;
    }
    public void setSizes(List<Size> sizes) {
        this.sizes = sizes;
    }
    public List<MainCategoryDto> getCategories() {
        return categories;
    }
    public void setCategories(List<MainCategoryDto> categories) {
        this.categories = categories;
    }

    public List<ProductSearchDto> getProducts() {
        return products;
    }

    public void setProducts(List<ProductSearchDto> products) {
        this.products = products;
    }

    
}
