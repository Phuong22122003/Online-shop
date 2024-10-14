package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.Shopping.MainCategoryDto;
import com.webbanhang.webbanhang.Service.CatergoryService;

@RestController
@RequestMapping("api/v1/categories")
public class CategoriesRestController {
    private CatergoryService mainCatergoriesService;
    public CategoriesRestController(CatergoryService mainCatergoriesService){
        this.mainCatergoriesService = mainCatergoriesService;
    }

    @GetMapping("/all")
    public List<MainCategoryDto> findCategories(){
        return mainCatergoriesService.findCategories();
    }
}
