package com.webbanhang.webbanhang.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.MainCategoryDto;
import com.webbanhang.webbanhang.Dto.SubCategoryDto;
import com.webbanhang.webbanhang.Entity.MainCategory;
import com.webbanhang.webbanhang.Entity.SubCategory;
import com.webbanhang.webbanhang.Repository.MainCategoryRepository;
import com.webbanhang.webbanhang.Repository.SubCategoryRepository;
import com.webbanhang.webbanhang.Repository.UserRepository;

@Service
public class MainCatergoryService {
    @Autowired private UserRepository a;
    private MainCategoryRepository mainCategoriesRepository;
    private SubCategoryRepository subCategoriesRepository;
    public MainCatergoryService(MainCategoryRepository mainCategoriesRepository, SubCategoryRepository subCategoriesRepository){
        this.mainCategoriesRepository = mainCategoriesRepository; 
        this.subCategoriesRepository = subCategoriesRepository;
    }

    public List<MainCategoryDto> findCategories(){
        List<MainCategory> mainCategories = mainCategoriesRepository.findAll();
        List<MainCategoryDto> categories = new ArrayList<>();
        MainCategoryDto category;
        SubCategoryDto subCategory;
        for(MainCategory item : mainCategories){
            category = new MainCategoryDto();
            category.setId(item.getId());
            category.setName(item.getName());
            category.setSubCategories(new ArrayList<>());
            for(SubCategory subItem: item.getSubCategories()){

                subCategory = new SubCategoryDto();
                subCategory.setId(subItem.getId());
                subCategory.setName(subItem.getName());
                category.getSubCategories().add(subCategory);
            }
            categories.add(category);
        }
        return categories;
    }
}
