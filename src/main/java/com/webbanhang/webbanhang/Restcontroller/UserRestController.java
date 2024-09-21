package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.CartDto;
import com.webbanhang.webbanhang.Dto.UserOrdersDto;
import com.webbanhang.webbanhang.Entity.Address;
import com.webbanhang.webbanhang.Entity.User;
import com.webbanhang.webbanhang.Service.AddressService;
import com.webbanhang.webbanhang.Service.CartService;
import com.webbanhang.webbanhang.Service.UserService;

@RestController 
@RequestMapping("/api/v1/user/")
public class UserRestController {
    private CartService cartService;
    private AddressService addressService;
    private UserService userService;
    public UserRestController(CartService cartService,AddressService addressService,UserService  userService){
        this.cartService = cartService;
        this.addressService = addressService;
        this.userService = userService;
    }

    @GetMapping("cart")
    public List<CartDto> carts(){
        return cartService.findUserCart("hnguyenphuong09@gmail.com");
    }
    @GetMapping("/addresses")
    public List<Address> findAddress(){
        return addressService.findAddressByEmail("hnguyenphuong09@gmail.com");
    }
    @GetMapping("/profile/info")
    public User findUserInfo(){
        return userService.findUserByEmail("hnguyenphuong09@gmail.com");
    }
    @GetMapping("/profile/orders")
    public List<UserOrdersDto> findUserOrdersByEmail(){
        String email = "hnguyenphuong09@gmail.com";
        return userService.findUserOrdersByEmail(email);
    }
}
