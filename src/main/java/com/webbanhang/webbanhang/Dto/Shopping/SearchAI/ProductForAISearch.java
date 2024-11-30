package com.webbanhang.webbanhang.Dto.Shopping.SearchAI;

import com.webbanhang.webbanhang.Dto.Shopping.ProductSearchDto;

public class ProductForAISearch extends ProductSearchDto {
    // private Integer Id;
    // private String name;
    // private String imagePath;
    // private String description;
    // private String price;
    // private Boolean deletedFlat;
    private Integer subCategoryId;
    private String subCategoryName;
    public Integer getSubCategoryId() {
        return subCategoryId;
    }
    public void setSubCategoryId(Integer subCategoryId) {
        this.subCategoryId = subCategoryId;
    }
    public String getSubCategoryName() {
        return subCategoryName;
    }
    public void setSubCategoryName(String subCategoryName) {
        this.subCategoryName = subCategoryName;
    }
    
}
