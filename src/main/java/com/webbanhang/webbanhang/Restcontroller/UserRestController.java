package com.webbanhang.webbanhang.Restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.CustomException.DuplicateCartException;
import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.Shopping.CartDto;
import com.webbanhang.webbanhang.Dto.User.Buy.BuyRequestDto;
import com.webbanhang.webbanhang.Dto.User.Buy.OrderRequestDto;
import com.webbanhang.webbanhang.Dto.User.Profile.CartQuantityUpdateDto;
import com.webbanhang.webbanhang.Dto.User.Profile.UserOrdersDto;
import com.webbanhang.webbanhang.Entity.Address;
import com.webbanhang.webbanhang.Entity.Cart;
import com.webbanhang.webbanhang.Entity.User;
import com.webbanhang.webbanhang.Service.AddressService;
import com.webbanhang.webbanhang.Service.CartService;
import com.webbanhang.webbanhang.Service.UserService;

import jakarta.servlet.http.HttpSession;

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
    public List<CartDto> carts(HttpSession session){
        String email = session.getAttribute("email").toString();
        return cartService.findUserCart(email);
    }
    @GetMapping("/addresses")
    public List<Address> findAddress(HttpSession session){
        String email = session.getAttribute("email").toString();
        return addressService.findAddressByEmail(email);
    }
    @GetMapping("/profile/info")
    public User findUserInfo(HttpSession session){
        String email = session.getAttribute("email").toString();
        return userService.findUserByEmail(email);
    }
    @GetMapping("/profile/orders")
    public List<UserOrdersDto> findUserOrdersByEmail(HttpSession session){
        String email = session.getAttribute("email").toString();
        return userService.findUserOrdersByEmail(email);
    }

    @PostMapping("/add-orders-to-session")
    public ResponseEntity<Boolean> addProductToSession(@RequestBody List<OrderRequestDto> orderRequestDtos, HttpSession session){
        // List<OrderRequestDto> li =new ArrayList<>();
        // li.add(orderRequestDto);
        session.setAttribute("order-summary", orderRequestDtos);
        return ResponseEntity.ok().body(true);
    }
    @PostMapping("/cart/add")
    public ResponseEntity<?> addToCart(@RequestBody Cart cart,HttpSession session){
        String email = session.getAttribute("email").toString();
        cart.setEmail(email);
        ResponseDto response = new ResponseDto();
        try {
            Cart savedCart = cartService.addToCart(cart);
            response.setError(false);
            response.setMessage("Add successfully");
            response.setData(savedCart);
            return ResponseEntity.ok().body(response);
        }
        catch (IllegalArgumentException e) {
            response.setError(true);
            response.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        catch(Exception exception){
            response.setError(true);
            response.setMessage("Server error");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    @PostMapping("/buy")
    public ResponseEntity<ResponseDto> buy(@RequestBody BuyRequestDto buyRequestDto,HttpSession session){
        ResponseDto response = new ResponseDto();
        if(session.getAttribute("email")==null){
            response.setError(true);
            response.setMessage("Please login again");
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(response);
        }
        String email = session.getAttribute("email").toString();
        buyRequestDto.setEmail(email);
        try {
            userService.buy(buyRequestDto);
            response.setError(false);
            response.setMessage("Sucessfully");
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            response.setError(true);
            response.setMessage(e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/cancel-order")
    public void cancelOrder(@RequestBody Integer orderId){
        userService.cancelOrder(orderId);   
    }
    @PostMapping("/update-cart-quantity")
    public ResponseEntity<?> updateCartQuantity(@RequestBody CartQuantityUpdateDto cartQuantityUpdateDto,HttpSession session){
        String email = session.getAttribute("email").toString();
        cartQuantityUpdateDto.setEmail(email);
        Integer quantity = cartService.updateCartQuantity(cartQuantityUpdateDto);
        return ResponseEntity.ok().body(quantity);
    }
}
