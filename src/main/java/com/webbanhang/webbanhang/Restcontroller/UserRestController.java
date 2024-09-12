package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.CartDto;
import com.webbanhang.webbanhang.Service.CartService;

@RestController 
@RequestMapping("/api/v1/user/")
public class UserRestController {
    private CartService cartService;
    public UserRestController(CartService cartService){
        this.cartService = cartService;
    }

    @GetMapping("cart")
    public List<CartDto> carts(){
        return cartService.findUseCart("hnguyenphuong09@gmail.com");
    }
    
}
