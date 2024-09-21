package com.webbanhang.webbanhang.Controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.client.RestTemplate;

import com.webbanhang.webbanhang.Dto.OrderRequestDto;
import com.webbanhang.webbanhang.Dto.UserOrderSummary;
import com.webbanhang.webbanhang.Service.ProductService;

@Controller
public class UserPageController {

    @Autowired private ProductService productService;
    @GetMapping("/cart")
    public String card(){
        return "/shopping/cart";
    }
    @GetMapping("/order-summary")
    public String orderSummery(Model model){
        List<OrderRequestDto> orderRequestDtos = new ArrayList<>();
        OrderRequestDto orderRequest = new OrderRequestDto();
        orderRequest.setProductVariantId(1);
        orderRequest.setQuantity(1);
        orderRequestDtos.add(orderRequest);
        List<UserOrderSummary> orders = productService.orderSummary(orderRequestDtos);
        Double total = 0.0;
        for(UserOrderSummary order:orders){
            total += order.getSubTotal();
        };
        model.addAttribute("orders", orders);
        model.addAttribute("total", total);
        
        // final String uri = "https://esgoo.net/api-tinhthanh/1/0.htm";

        // RestTemplate restTemplate = new RestTemplate();
        // String result = restTemplate.getForObject(uri, String.class);
        // System.out.println(result);
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
