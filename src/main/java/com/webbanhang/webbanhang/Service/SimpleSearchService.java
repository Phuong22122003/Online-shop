package com.webbanhang.webbanhang.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.MainCategoryDto;
import com.webbanhang.webbanhang.Dto.ProductSearchDto;
import com.webbanhang.webbanhang.Dto.SearchDto;
import com.webbanhang.webbanhang.Entity.Color;
import com.webbanhang.webbanhang.Entity.Size;
import com.webbanhang.webbanhang.Service.ServiceInterface.SearchService;

@Service
public class SimpleSearchService implements SearchService {
    private ProductService productService;
    private ColorService  colorsService;
    private SizeService sizesService;
    private MainCatergoryService catergoryService;

    public SimpleSearchService(ProductService productService, ColorService colorsService, SizeService sizesService,MainCatergoryService catergoryService){
        this.productService = productService;
        this.sizesService =   sizesService;
        this.colorsService = colorsService;
        this.catergoryService = catergoryService;
    }

    public SearchDto search(String key){
        SearchDto searchDto = new SearchDto();
        List<ProductSearchDto> products = productService.findAllProductsForSearch();
        List<Color> colors = colorsService.findAll();
        List<Size> sizes = sizesService.findAll();
        List<MainCategoryDto> categories = catergoryService.findCategories();
        searchDto.setProducts(new ArrayList<>());
        for(ProductSearchDto product : products){
            if(product.getName().trim().toLowerCase().contains(key.trim().toLowerCase())){
                searchDto.getProducts().add(product);
            }
        }
        searchDto.setColors(colors);
        searchDto.setSizes(sizes);
        searchDto.setCategories(categories);
        return searchDto;
    }
}
