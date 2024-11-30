package com.webbanhang.webbanhang.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.Shopping.MainCategoryDto;
import com.webbanhang.webbanhang.Dto.Shopping.ProductSearchDto;
import com.webbanhang.webbanhang.Dto.Shopping.SearchDto;
import com.webbanhang.webbanhang.Service.ServiceInterface.SearchService;

@Service
public class SimpleSearchService implements SearchService {
    private ProductService productService;
    private ColorService  colorsService;
    private SizeService sizesService;
    private CatergoryService catergoryService;

    public SimpleSearchService(ProductService productService, ColorService colorsService, SizeService sizesService,CatergoryService catergoryService){
        this.productService = productService;
        this.sizesService =   sizesService;
        this.colorsService = colorsService;
        this.catergoryService = catergoryService;
    }

    public SearchDto search(String key){
        SearchDto searchDto = new SearchDto();
        List<ProductSearchDto> products = productService.findAllProductsForSearch();
        List<MainCategoryDto> categories = catergoryService.findCategories();
        searchDto.setProducts(new ArrayList<>());
        Map<String,Integer>sizes = new HashMap<>();
        Map<String,Integer> colors = new HashMap<>();
        for(ProductSearchDto product : products){
            if(product.getName().trim().toLowerCase().contains(key.trim().toLowerCase())
            ||product.getDescription().trim().toLowerCase().contains(key.trim().toLowerCase())){
                searchDto.getProducts().add(product);
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
        }
        searchDto.setCategories(categories);
        searchDto.setColors(colors);
        searchDto.setSizes(sizes);
        return searchDto;
    }
}
