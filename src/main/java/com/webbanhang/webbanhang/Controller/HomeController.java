package com.webbanhang.webbanhang.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import com.webbanhang.webbanhang.Service.ProductService;
import jakarta.servlet.http.HttpSession;



@Controller
public class HomeController {
    @Autowired private ProductService productService;
    @GetMapping("/home")
    public String home(Model model,HttpSession session){
        if(session.getAttribute("role")!=null)
            model.addAttribute("role", session.getAttribute("role").toString());
        else model.addAttribute("role","CUSTOMER");
        return "home";
    }   
    @GetMapping("/product-detail/{productId}")
    public String productDetail(@PathVariable("productId") String productId,Model model){
        model.addAttribute("product", productService.getDetailProduct(productId));
        return "product-detail";
    }
    @GetMapping("/buy-product")
    public String getCustomerCartById(@RequestParam("productId")String productId,@RequestParam("quantity") Integer quantity,@RequestParam("address") String address,Model model){
        model.addAttribute("productId",productId);
        model.addAttribute("quantity", quantity);
        model.addAttribute("address",address);
        return "cart";
    }
    @GetMapping("/cart")
    public String getCustomerCart(){
        return "cart";
    }
    @GetMapping("/search")
    public String search(@RequestParam("keyword") String keyword,Model model){
        model.addAttribute("keyword", keyword);
        return "home";
    }
    @GetMapping("/purchase")
    public String customerPuschase(){
        return "purchase";
    }


}
