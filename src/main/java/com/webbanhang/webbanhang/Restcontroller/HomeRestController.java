package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.webbanhang.webbanhang.Dto.ProductInfoDto;
import com.webbanhang.webbanhang.Service.ProductService;


@RestController
@RequestMapping("api/")
public class HomeRestController {
    @Autowired private ProductService productService; 

    @GetMapping("/list-product")
    public List<ProductInfoDto> getListProduct(){
        return productService.getListProduct();
    }
    @GetMapping("/search")
    //Processing
    public List<ProductInfoDto> search(@RequestParam("keyword")String keyword){
        return productService.getListProductByKeyword(keyword);
    }
}
