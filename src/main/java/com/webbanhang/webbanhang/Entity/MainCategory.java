package com.webbanhang.webbanhang.Entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "MainCategories")
public class MainCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Gender")
    private String gender;

    @Column(name = "Delete_flat")
    private Boolean deleteFlat;

    @OneToMany(mappedBy = "mainCategory")    
    private List<SubCategory> subCategories;


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


    public List<SubCategory> getSubCategories() {
        return subCategories;
    }


    public void setSubCategories(List<SubCategory> subCategories) {
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
