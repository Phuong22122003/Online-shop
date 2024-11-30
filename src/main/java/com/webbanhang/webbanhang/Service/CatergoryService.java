package com.webbanhang.webbanhang.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.Shopping.MainCategoryDto;
import com.webbanhang.webbanhang.Dto.Shopping.SubCategoryDto;
import com.webbanhang.webbanhang.Entity.MainCategory;
import com.webbanhang.webbanhang.Entity.SubCategory;
import com.webbanhang.webbanhang.Repository.MainCategoryRepository;
import com.webbanhang.webbanhang.Repository.SubCategoryRepository;

@Service
public class CatergoryService {
    private MainCategoryRepository mainCategoriesRepository;
    private SubCategoryRepository subCategoriesRepository;
    public CatergoryService(MainCategoryRepository mainCategoriesRepository, SubCategoryRepository subCategoriesRepository){
        this.mainCategoriesRepository = mainCategoriesRepository; 
        this.subCategoriesRepository = subCategoriesRepository;
    }
    public Integer findMainCategoryIdBySubId(Integer id){
        SubCategory subCategory = subCategoriesRepository.findById(id).get();
        if(subCategory!=null)return subCategory.getMainCategory().getId();
        return null;
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
            category.setGender(item.getGender());
            category.setSubCategories(new ArrayList<>());
            category.setDeleteFlat(item.getDeleteFlat()==null?false:item.getDeleteFlat());
            for(SubCategory subItem: item.getSubCategories()){
                subCategory = new SubCategoryDto();
                subCategory.setDeleteFlat(subItem.getDeleteFlat()== null?false:subItem.getDeleteFlat());
                subCategory.setId(subItem.getId());
                subCategory.setName(subItem.getName());
                category.getSubCategories().add(subCategory);
            }
            categories.add(category);
        }
        return categories;
    }
    public SubCategoryDto findSubCategoryById(Integer subCategoryId){
        SubCategory subCategory =  subCategoriesRepository.findById(subCategoryId).get();
        if(subCategory == null) return null;
        SubCategoryDto subCategoryDto = new SubCategoryDto();
        subCategoryDto.setName(subCategory.getName());
        return subCategoryDto;
    }
    public ResponseDto updateMainFlat(Map<String,Object> updateRequest){
        Integer id = Integer.parseInt(updateRequest.get("id").toString());
        Boolean flat = Boolean.parseBoolean(updateRequest.get("flat").toString());
        MainCategory mainCategory = mainCategoriesRepository.findById(id).get();
        ResponseDto responseDto = new ResponseDto();
        if(mainCategory==null){
            responseDto.setError(true);
            responseDto.setMessage("Không tìm thấy danh mục");
            return responseDto;
        }
        mainCategory.setDeleteFlat(flat);
        try {
            mainCategoriesRepository.save(mainCategory);
        } catch (Exception e) {
            responseDto.setError(true);
            responseDto.setMessage("Lỗi cập nhật");
            return responseDto;
        }
        responseDto.setError(false);
        responseDto.setMessage("Cập nhật thành công");
        return responseDto;
        
    }
    public ResponseDto updateSubFlat(Map<String,Object> updateRequest){
        Integer id = Integer.parseInt(updateRequest.get("id").toString());
        Boolean flat = Boolean.parseBoolean(updateRequest.get("flat").toString());
        SubCategory subCategory = subCategoriesRepository.findById(id).get();
        ResponseDto responseDto = new ResponseDto();
        if(subCategory==null){
            responseDto.setError(true);
            responseDto.setMessage("Không tìm thấy danh mục");
            return responseDto;
        }
        subCategory.setDeleteFlat(flat);
        try {
            subCategoriesRepository.save(subCategory);
        } catch (Exception e) {
            responseDto.setError(true);
            responseDto.setMessage("Lỗi cập nhật");
            return responseDto;
        }
        responseDto.setError(false);
        responseDto.setMessage("Cập nhật thành công");
        return responseDto;
        
    }
    public List<MainCategoryDto> findSubCategoryAndConverToMainCategory(List<Integer> subCategoryIds){
        List<SubCategory> subCategories = subCategoriesRepository.findAll();
        List<MainCategoryDto> mainCategoryDtos = new ArrayList<>();
        for(SubCategory subCategory: subCategories){
            if(subCategoryIds.contains(subCategory.getId())){
                MainCategoryDto mainCategoryDto = new MainCategoryDto();
                mainCategoryDto.setId(subCategory.getId());
                mainCategoryDto.setName(subCategory.getName());
                mainCategoryDtos.add(mainCategoryDto);
            }
        }
        return mainCategoryDtos;
    }
    public ResponseDto updateMainInfo(Map<String,Object> updateRequest){
        Integer id = Integer.parseInt(updateRequest.get("id").toString());
        String name = updateRequest.get("name").toString();
        String gender = updateRequest.get("gender").toString();

        MainCategory mainCategory = mainCategoriesRepository.findById(id).get();

        ResponseDto responseDto = new ResponseDto();
        if(mainCategory==null){
            responseDto.setError(true);
            responseDto.setMessage("Không tìm thấy danh mục");
            return responseDto;
        }
        mainCategory.setName(name);
        mainCategory.setGender(gender);
        try {
            mainCategoriesRepository.save(mainCategory);
        } catch (Exception e) {
            responseDto.setError(true);
            responseDto.setMessage("Lỗi cập nhật");
            return responseDto;
        }
        responseDto.setError(false);
        responseDto.setMessage("Cập nhật thành công");
        return responseDto;
        
    }
    public ResponseDto updateSubInfo(Map<String,Object> updateRequest){
        Integer id = Integer.parseInt(updateRequest.get("id").toString());
        String name = updateRequest.get("name").toString();

        SubCategory subCategory = subCategoriesRepository.findById(id).get();

        ResponseDto responseDto = new ResponseDto();
        if(subCategory==null){
            responseDto.setError(true);
            responseDto.setMessage("Không tìm thấy danh mục");
            return responseDto;
        }
        subCategory.setName(name);
        try {
            subCategoriesRepository.save(subCategory);
        } catch (Exception e) {
            responseDto.setError(true);
            responseDto.setMessage("Lỗi cập nhật");
            return responseDto;
        }
        responseDto.setError(false);
        responseDto.setMessage("Cập nhật thành công");
        return responseDto;
        
    }
    public ResponseDto addMainCategory(Map<String,Object> addRequest){
        String name = addRequest.get("name").toString();
        String gender = addRequest.get("gender").toString();

        MainCategory mainCategory = new MainCategory();
        ResponseDto responseDto = new ResponseDto();
        mainCategory.setName(name);
        mainCategory.setGender(gender);
        try {
            mainCategoriesRepository.save(mainCategory);
        } catch (Exception e) {
            responseDto.setError(true);
            responseDto.setMessage("Không thể thêm");
            return responseDto;
        }
        responseDto.setError(false);
        responseDto.setMessage("Thêm thành công");
        return responseDto;
        
    }
    public ResponseDto addSubCategory(Map<String,Object> addRequest){
        String name = addRequest.get("name").toString();

        SubCategory subCategory = new SubCategory();

        ResponseDto responseDto = new ResponseDto();

        subCategory.setName(name);
        try {
            subCategoriesRepository.save(subCategory);
        } catch (Exception e) {
            responseDto.setError(true);
            responseDto.setMessage("Thêm thất bại");
            return responseDto;
        }
        responseDto.setError(false);
        responseDto.setMessage("Thêm thành công");
        return responseDto;
        
    }
}
