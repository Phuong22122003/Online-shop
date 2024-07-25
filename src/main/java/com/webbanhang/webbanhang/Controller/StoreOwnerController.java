package com.webbanhang.webbanhang.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.webbanhang.webbanhang.Entity.PRODUCT;
import com.webbanhang.webbanhang.Service.ProductService;

@Controller 
@RequestMapping("/store-owner")
public class StoreOwnerController {
    @Autowired private ProductService productService;
    @GetMapping("/edit-product/{productId}")
    public String editProduct(@PathVariable("productId") String productId,Model model){
        PRODUCT product = productService.getDetailProduct(productId);
        model.addAttribute("product", product);
        return "edit-stock";
    }
    @GetMapping("/add-product")
    public String editProduct(Model model){
        PRODUCT product = new PRODUCT();
        model.addAttribute("product", product);
        return "add-product";
    }
    @GetMapping("/client-stock")
    public String clientStock(){
        return "client-stock";
    }
  
}
