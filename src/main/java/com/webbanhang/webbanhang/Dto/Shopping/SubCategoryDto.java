package com.webbanhang.webbanhang.Dto.Shopping;

public class SubCategoryDto {
    private Integer id;
    private String name;
    private Boolean deleteFlat;
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
    public SubCategoryDto() {
    }
    public Boolean getDeleteFlat() {
        return deleteFlat;
    }
    public void setDeleteFlat(Boolean deleteFlat) {
        this.deleteFlat = deleteFlat;
    }
    
}
