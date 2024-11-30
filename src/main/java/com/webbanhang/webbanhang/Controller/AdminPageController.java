package com.webbanhang.webbanhang.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminPageController {
    @GetMapping("dashboard")
    public String dashboard(){
        return "redirect:/admin/products";
    }
    @GetMapping("/add")
    public String addProduct(){
        return "/store-management/add";
    }
    @GetMapping("/products")
    public String inventory(){
        return "/store-management/inventory";
    }
    @GetMapping("/orders")
    public String orders(){
        return "/store-management/orders-management";
    }
    @GetMapping("/product-detail")
    public String productDetail(){
        return "/store-management/product-detail";
    }

    @GetMapping("/categories")
    public String categories(){
        return "/store-management/categories";
    }

}
