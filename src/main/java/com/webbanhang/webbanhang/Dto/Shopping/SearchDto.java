package com.webbanhang.webbanhang.Dto.Shopping;

import java.util.List;
import java.util.Map;

public class SearchDto {
    private List<ProductSearchDto> products;
    private Map<String,Integer> colors;
    private Map<String,Integer> sizes;
    public List<MainCategoryDto> categories;
    public SearchDto(){
    }
   

    public Map<String, Integer> getColors() {
        return colors;
    }


    public void setColors(Map<String, Integer> colors) {
        this.colors = colors;
    }


    public Map<String, Integer> getSizes() {
        return sizes;
    }


    public void setSizes(Map<String, Integer> sizes) {
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
