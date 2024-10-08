package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webbanhang.webbanhang.Dto.ProductAddRequestDto;
import com.webbanhang.webbanhang.Dto.ProductDetailDto;
import com.webbanhang.webbanhang.Dto.ProductDto;
import com.webbanhang.webbanhang.Dto.ResponseDto;
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

    @PostMapping("/add")
    public ResponseEntity<ResponseDto> add(@RequestPart(required = false) MultipartFile coverImage,@RequestPart(required = false) MultipartFile[] colors,@RequestParam(name = "product",required = false) String productJson){
        ObjectMapper objectMapper = new ObjectMapper();
        ResponseDto response = new ResponseDto();
        try{
            ProductAddRequestDto product = objectMapper.readValue(productJson,ProductAddRequestDto.class);
            productService.addProduct(product, coverImage, colors);
            response.setError(false);
            response.setMessage("Add product successfully");
            return ResponseEntity.ok().body(response);
        }
        catch(Exception ex){
            response.setError(true);
            response.setMessage(ex.getMessage());
            return ResponseEntity.internalServerError().body(response)  ;
        }
        // System.out.println(coverImage.getOriginalFilename());
    }
}
