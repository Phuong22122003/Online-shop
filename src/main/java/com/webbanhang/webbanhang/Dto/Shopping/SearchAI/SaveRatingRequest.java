package com.webbanhang.webbanhang.Dto.Shopping.SearchAI;

import java.util.List;

public class SaveRatingRequest {
    private String description;
    private List<String> colorLabels;
    private List<String> sizeLabels;
    private List<String> subCategoryLabels;
    private List<String> genderLabels;
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getSizeLabels() {
        return sizeLabels;
    }
    public void setSizeLabels(List<String> sizeLabels) {
        this.sizeLabels = sizeLabels;
    }
    public List<String> getSubCategoryLabels() {
        return subCategoryLabels;
    }
    public void setSubCategoryLabels(List<String> subCategoryLabels) {
        this.subCategoryLabels = subCategoryLabels;
    }

    public List<String> getColorLabels() {
        return colorLabels;
    }
    public void setColorLabels(List<String> colorLabels) {
        this.colorLabels = colorLabels;
    }
    public List<String> getGenderLabels() {
        return genderLabels;
    }
    public void setGenderLabels(List<String> genderLabels) {
        this.genderLabels = genderLabels;
    }

}
