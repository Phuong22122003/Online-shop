package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.AddProduct.ProductAddRequestDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct.ProductUpdateRequestDto;
import com.webbanhang.webbanhang.Dto.Shopping.ProductDetailDto;
import com.webbanhang.webbanhang.Dto.Shopping.ProductDto;
import com.webbanhang.webbanhang.Dto.Shopping.SearchDto;
import com.webbanhang.webbanhang.Service.ProductService;
import com.webbanhang.webbanhang.Service.SearchByDescService;
import com.webbanhang.webbanhang.Service.ServiceInterface.SearchService;
@RestController
@Deprecated
@RequestMapping("/api/v1/products")
public class ProductsRestController {
    private ProductService productService;
    private SearchService searchService;
    private SearchByDescService searchByDescService;
    public ProductsRestController(ProductService productService,SearchService searchService,SearchByDescService searchByDescService){
        this.productService = productService;
        this.searchService = searchService;
        this.searchByDescService = searchByDescService;
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
    public List<ProductDto> findRecommendedProducts(@RequestParam(required = false) Integer productId){
        return productService.findRecommendedProducts(productId);
    }

    @GetMapping("/search")
    public SearchDto findProductsByKey(@RequestParam String key){
        return searchService.search(key);
    }

    /**
     * Trả về kết quả tìm kiếm bằng mô tả người dùng.
     * @param desc
     * @return
     */

    @Deprecated
    @GetMapping("/search-by-des")
    public SearchDto findProductByDesc(@RequestParam String des){
    // public SearchDto findProductByDesc(){
        return searchByDescService.searchByDes(des);
    }


    @GetMapping("/category/{id}")
    public SearchDto findProductsOfCategory(@PathVariable Integer id){
        return productService.findProductsOfCategory(id);
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
            response.setMessage("Sản phẩm đã được thêm thành công");
            return ResponseEntity.ok().body(response);
        }
        catch(Exception ex){
            response.setError(true);
            response.setMessage(ex.getMessage());
            return ResponseEntity.internalServerError().body(response)  ;
        }
        // System.out.println(coverImage.getOriginalFilename());
    }
    @PostMapping("/update")
    public ResponseEntity<?> modifyProduct(@RequestPart(required = false) MultipartFile coverImage, @RequestPart(required =  false) MultipartFile[] colorImages,@RequestParam(name = "product") String productJson){
        ResponseDto responseDto = new ResponseDto();
        ObjectMapper objectMapper = new ObjectMapper();
        try{
            ProductUpdateRequestDto product = objectMapper.readValue(productJson,ProductUpdateRequestDto.class);
            System.out.println(product);
            productService.updateProduct(product, coverImage, colorImages);
            responseDto.setMessage("Cập nhật thành công");
            responseDto.setError(false);
        }
        catch(Exception ex){
            responseDto.setMessage("Lỗi cập nhật"+ex.getMessage());
            responseDto.setError(true);
            System.out.println(ex.getMessage());
        }
        return ResponseEntity.ok().body(responseDto);
    }
}
