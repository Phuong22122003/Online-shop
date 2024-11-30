package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.Shopping.MainCategoryDto;
import com.webbanhang.webbanhang.Service.CatergoryService;

@RestController
@RequestMapping("api/v1/categories")
public class CategoriesRestController {
    private CatergoryService catergoryService;
    public CategoriesRestController(CatergoryService catergoryService){
        this.catergoryService = catergoryService;
    }

    @GetMapping("/all")
    public List<MainCategoryDto> findCategories(){
        return catergoryService.findCategories();
    }
    @PostMapping("/update-main-flat")
    public ResponseEntity<?> updateMainCategoryFlat(@RequestBody Map<String,Object> updateRequest){
        ResponseDto responseDto = catergoryService.updateMainFlat(updateRequest);
        if(responseDto.getError()){
            return ResponseEntity.badRequest().body(responseDto.getMessage());
        }
        return ResponseEntity.ok().body(responseDto.getMessage());
    }
    @PostMapping("/update-sub-flat")
    public ResponseEntity<?> updateSubCategoryFlat(@RequestBody Map<String,Object> updateRequest){
        ResponseDto responseDto = catergoryService.updateSubFlat(updateRequest);
        if(responseDto.getError()){
            return ResponseEntity.badRequest().body(responseDto.getMessage());
        }
        return ResponseEntity.ok().body(responseDto.getMessage());
    }
    
    @PostMapping("/update-main-info")
    public ResponseEntity<?> updateMainInfo(@RequestBody Map<String,Object> updateRequest){
        ResponseDto responseDto = catergoryService.updateMainInfo(updateRequest);
        if(responseDto.getError()){
            return ResponseEntity.badRequest().body(responseDto.getMessage());
        }
        return ResponseEntity.ok().body(responseDto.getMessage());
    }
    @PostMapping("/update-sub-info")
    public ResponseEntity<?> updateSubInfo(@RequestBody Map<String,Object> updateRequest){
        ResponseDto responseDto = catergoryService.updateSubInfo(updateRequest);
        if(responseDto.getError()){
            return ResponseEntity.badRequest().body(responseDto.getMessage());
        }
        return ResponseEntity.ok().body(responseDto.getMessage());
    }
    @PostMapping("/add-maincategory")
    public ResponseEntity<?> addMainCategory(@RequestBody Map<String,Object> updateRequest){
        ResponseDto responseDto = catergoryService.addMainCategory(updateRequest);
        if(responseDto.getError()){
            return ResponseEntity.badRequest().body(responseDto.getMessage());
        }
        return ResponseEntity.ok().body(responseDto.getMessage());
    }
    @PostMapping("/add-subcategory")
    public ResponseEntity<?> addSubCategory(@RequestBody Map<String,Object> updateRequest){
        ResponseDto responseDto = catergoryService.addSubCategory(updateRequest);
        if(responseDto.getError()){
            return ResponseEntity.badRequest().body(responseDto.getMessage());
        }
        return ResponseEntity.ok().body(responseDto.getMessage());
    }
}
