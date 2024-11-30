package com.webbanhang.webbanhang.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.webbanhang.webbanhang.Dto.Shopping.UserOrderSummary;
import com.webbanhang.webbanhang.Dto.User.Buy.OrderRequestDto;
import com.webbanhang.webbanhang.Service.ProductService;

import jakarta.servlet.http.HttpSession;

@Controller
public class UserPageController {

    @Autowired private ProductService productService;
    @GetMapping("/cart")
    public String card(){
        return "/profile/cart";
    }
    @GetMapping("/order-summary")
    @SuppressWarnings("unchecked")
    public String orderSummery(Model model,HttpSession session){
        List<OrderRequestDto> orderRequestDtos = (List<OrderRequestDto>)session.getAttribute("order-summary");
        if(orderRequestDtos == null)
            return "redirect:/home";
        List<UserOrderSummary> orders = productService.orderSummary(orderRequestDtos);
        Double total = 0.0;
        for(UserOrderSummary order:orders){
            total += order.getSubTotal();
        };
        model.addAttribute("orders", orders);
        model.addAttribute("total", total);
        
        return "/shopping/order-summary";
    }

    @GetMapping("/profile")
    public String profile(){
        return "redirect:/profile/info";
    }

    @GetMapping("/profile/info")
    public String personalInfo(){
        return "/profile/personal-info";
    }

    @GetMapping("/profile/orders")
    public String userOrders(){
        return "/profile/my-orders";
    }
    @GetMapping("/profile/setting")
    public String setting(){
        return "/profile/setting";
    }

}
