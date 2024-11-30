package com.webbanhang.webbanhang.Dto.Shopping;

import java.util.List;

public class MainCategoryDto{
    private Integer id;
    private String name;
    private Boolean deleteFlat;
    private String gender;
    private List<SubCategoryDto> subCategories;
    
    public MainCategoryDto() {
    }
    public MainCategoryDto(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public List<SubCategoryDto> getSubCategories() {
        return subCategories;
    }
    public void setSubCategories(List<SubCategoryDto> subCategories) {
        this.subCategories = subCategories;
    }
    public Boolean getDeleteFlat() {
        return deleteFlat;
    }
    public void setDeleteFlat(Boolean deleteFlat) {
        this.deleteFlat = deleteFlat;
    }
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    
}
