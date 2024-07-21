package com.webbanhang.webbanhang.Controller;

import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.webbanhang.webbanhang.Entity.PRODUCT;
import com.webbanhang.webbanhang.Service.ProductService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;



@Controller
public class HomeController {
    @Autowired private ProductService productService;
    @GetMapping("/home")
    public String home(Model model,HttpSession session){
        model.addAttribute("role", session.getAttribute("role").toString());
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
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/login?logout"; // Chuyển hướng đến trang login sau khi logout
    }
    @GetMapping("/client-stock")
    public String clientStock(){
        return "client-stock";
    }
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
}
