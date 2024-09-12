package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.MainCategoryDto;
import com.webbanhang.webbanhang.Service.MainCatergoryService;

@RestController
@RequestMapping("api/v1/categories")
public class CategoriesRestController {
    private MainCatergoryService mainCatergoriesService;
    public CategoriesRestController(MainCatergoryService mainCatergoriesService){
        this.mainCatergoriesService = mainCatergoriesService;
    }

    @GetMapping("/all")
    public List<MainCategoryDto> findCategories(){
        return mainCatergoriesService.findCategories();
    }
}
