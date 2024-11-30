package com.webbanhang.webbanhang.Dto.Shopping.SearchAI;

import java.util.List;

public class SearchResponseDto {
    private Boolean is_spam;
    private String description;
    private List<String> genders;
    private List<String> colorOptions;
    private List<String> sizeOptions;
    private List<String> subCategories;

    public Boolean getIs_spam() {
        return is_spam;
    }

    public void setIs_spam(Boolean is_spam) {
        this.is_spam = is_spam;
    }

    public boolean isIs_spam() {
        return is_spam;
    }

    public void setIs_spam(boolean is_spam) {
        this.is_spam = is_spam;
    }

    public List<String> getColorOptions() {
        return colorOptions;
    }

    public void setColorOptions(List<String> colorOptions) {
        this.colorOptions = colorOptions;
    }

    public List<String> getSizeOptions() {
        return sizeOptions;
    }

    public void setSizeOptions(List<String> sizeOptions) {
        this.sizeOptions = sizeOptions;
    }

    public List<String> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<String> subCategories) {
        this.subCategories = subCategories;
    }

    public List<String> getGenders() {
        return genders;
    }

    public void setGenders(List<String> genders) {
        this.genders = genders;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
}
