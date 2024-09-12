package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.ProductDetailDto;
import com.webbanhang.webbanhang.Dto.ProductDto;
import com.webbanhang.webbanhang.Dto.SearchDto;
import com.webbanhang.webbanhang.Service.ProductService;
import com.webbanhang.webbanhang.Service.ServiceInterface.SearchService;

@RestController
@RequestMapping("/api/v1/products")
public class ProductsRestController {
    private ProductService productService;
    private SearchService searchService;
    public ProductsRestController(ProductService productService,SearchService searchService){
        this.productService = productService;
        this.searchService = searchService;
    }
    @GetMapping("banner")
    public List<ProductDto> findBannerProducts(){
        return productService.findBannerProducts();
    }
    @GetMapping("best-seller")
    public List<ProductDto> findBestSellerProducts(){
        return productService.findBestSellerProducts();
    }
    @GetMapping("/recommended-products")
    public List<ProductDto> findRecommendedProducts(){
        return productService.findRecommendedProducts();
    }

    @GetMapping("/search")
    public SearchDto findProductsByKey(@RequestParam String key){
        return searchService.search(key);
    }
    @GetMapping("/detail")
    public ProductDetailDto detail(@RequestParam Integer id){
        return productService.findProductInfo(id);
    }
}
