package com.webbanhang.webbanhang.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProductPageController {
    @GetMapping("/home")
    public String homePage(){
        return "home/home";
    }
    @GetMapping("/search")
    public String search(@RequestParam String key){
        return "home/search";
    }
    
    @GetMapping("/products")
    public String detail(){
        return "/shopping/product-detail";
    }
}
