package com.webbanhang.webbanhang.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.webbanhang.webbanhang.Entity.CLIENT_INFO;
import com.webbanhang.webbanhang.Service.ClientService;
import com.webbanhang.webbanhang.Service.ProductService;
import jakarta.servlet.http.HttpSession;



@Controller
public class HomeController {
    @Autowired private ProductService productService;
    @Autowired private ClientService clientService;
    @GetMapping("/home")
    public String home(Model model,HttpSession session,@AuthenticationPrincipal OidcUser principal){
        // if(session.getAttribute("role")!=null)
        //     model.addAttribute("role", session.getAttribute("role").toString());
        // else model.addAttribute("role","CUSTOMER");
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
    @GetMapping("/order-details")
    public String orderDetails(){
        return "order-details";
    }

    @GetMapping("/profile")
    public String profile(Model model,HttpSession session){
        Object checkExist  = null;
        CLIENT_INFO  client = null;
        if((checkExist = session.getAttribute("clientId"))!=null){
            Integer clientId = Integer.parseInt(checkExist.toString());
            client = clientService.findClientById(clientId);
        }
        else if((checkExist = session.getAttribute("email")) !=null){
            client = clientService.findClientByEmail(checkExist.toString());
        }
        if(client == null) throw new Error("Can not access client's profile");
        
        model.addAttribute("profile", client);
        return "info";
    }
}
