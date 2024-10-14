package com.webbanhang.webbanhang.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ShoppingPageController {
    @GetMapping("/home")
    public String homePage(){
        return "home/home";
    }
    @GetMapping("/search")
    public String search(@RequestParam String key){
        return "shopping/search";
    }
    
    @GetMapping("/product")
    public String detail(){
        return "/shopping/product-detail";
    }
       @GetMapping("/category/{id}")
    public String category(@PathVariable Integer id){
        return "/shopping/category";
    }
}
