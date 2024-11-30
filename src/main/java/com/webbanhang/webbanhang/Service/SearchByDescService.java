package com.webbanhang.webbanhang.Service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webbanhang.webbanhang.Dto.Shopping.MainCategoryDto;
import com.webbanhang.webbanhang.Dto.Shopping.SearchAI.ProductForAISearch;
import com.webbanhang.webbanhang.Dto.Shopping.SearchAI.SaveRatingRequest;
import com.webbanhang.webbanhang.Dto.Shopping.SearchAI.SearchAIDto;
import com.webbanhang.webbanhang.Dto.Shopping.SearchAI.SearchResponseDto;

@Deprecated
@Service
public class SearchByDescService {
    
    private ProductService productService;
    private CatergoryService catergoryService;
    private RestTemplate restTemplate;
    public SearchByDescService(ProductService productService,CatergoryService catergoryService){
        this.productService = productService;
        this.catergoryService  = catergoryService;
        this.restTemplate = new RestTemplate();
    }

    public void saveRatingRequest(SaveRatingRequest request){
        try {
            String url = "http://localhost:5000/save-rating";
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            Map<String,SaveRatingRequest> body = new HashMap<>();
            body.put("rating-request",request);
            HttpEntity<Map<String,SaveRatingRequest>> entity = new HttpEntity<>(body, headers);
            restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        } catch (Exception e) {
            // TODO: handle exception
        }
    }

    public SearchResponseDto callAIServer(String description){
        String url = "http://localhost:5000/search";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        Map<String,String> body = new HashMap<>();
        body.put("description",description);
        HttpEntity<Map<String,String>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        String data = response.getBody();
        ObjectMapper mapper = new ObjectMapper();
        try {
            // Chuyển đổi JSON thành đối tượng Java
            SearchResponseDto searchResponseDto = mapper.readValue(data, SearchResponseDto.class);
            System.out.println(searchResponseDto);
            return searchResponseDto;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public SearchAIDto searchByDes(String des){
        SearchResponseDto data = callAIServer(des);
        SearchAIDto searchDto = new SearchAIDto();
        if(data.isIs_spam()==true){
            return searchDto;
        }

        data.setDescription(des);
        List<String>genders = data.getGenders();
        List<String> subCategory =data.getSubCategories();
        List<String> colorOptions = data.getColorOptions();
        List<String> sizeOptions = data.getSizeOptions();
        
        
        List<ProductForAISearch>products =  productService.findAllProductForAiSearch(genders, subCategory, colorOptions, sizeOptions);
        Map<String,Integer>sizes = new HashMap<>();
        Map<String,Integer> colors = new HashMap<>();
        List<Integer> subCategoryIds = new ArrayList<>();
        for(ProductForAISearch product : products){
            subCategoryIds.add(product.getSubCategoryId());
            for(String color: product.getColors()){
                if(colors.containsKey(color.trim().toUpperCase())){
                    colors.put(color.trim().toUpperCase(), colors.get(color) +1);
                }
                else
                    colors.put(color.trim().toUpperCase(), 1);
            }
            for(String size: product.getSizes()){
                if(sizes.containsKey(size.trim().toUpperCase())){
                    sizes.put(size.trim().toUpperCase(), sizes.get(size) +1);
                }
                else
                    sizes.put(size.trim().toUpperCase(), 1);
            }
        
        }

        List<MainCategoryDto> categories = catergoryService.findSubCategoryAndConverToMainCategory(subCategoryIds);
        searchDto.setSearchResponseDto(data);
        searchDto.setCategories(categories);
        searchDto.setProductIntoSuperClass(products);
        searchDto.setColors(colors);
        searchDto.setSizes(sizes);
        return searchDto;
    }

}
