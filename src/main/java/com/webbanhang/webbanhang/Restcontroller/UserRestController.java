package com.webbanhang.webbanhang.Restcontroller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.Shopping.CartDto;
import com.webbanhang.webbanhang.Dto.User.Buy.BuyRequestDto;
import com.webbanhang.webbanhang.Dto.User.Buy.OrderRequestDto;
import com.webbanhang.webbanhang.Dto.User.Profile.CartQuantityUpdateDto;
import com.webbanhang.webbanhang.Dto.User.Profile.UserOrdersDto;
import com.webbanhang.webbanhang.Entity.Address;
import com.webbanhang.webbanhang.Entity.Cart;
import com.webbanhang.webbanhang.Entity.ProductVariant;
import com.webbanhang.webbanhang.Entity.User;
import com.webbanhang.webbanhang.Service.AddressService;
import com.webbanhang.webbanhang.Service.CartService;
import com.webbanhang.webbanhang.Service.OrderService;
import com.webbanhang.webbanhang.Service.ProductVariantService;
import com.webbanhang.webbanhang.Service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController 
@RequestMapping("/api/v1/user/")
public class UserRestController {
    private CartService cartService;
    private AddressService addressService;
    private UserService userService;
    private ProductVariantService productVariantService;
    private OrderService orderService;
    public UserRestController(OrderService orderService,ProductVariantService productVariantService,CartService cartService,AddressService addressService,UserService  userService){
        this.cartService = cartService;
        this.addressService = addressService;
        this.userService = userService;
        this.productVariantService = productVariantService;
        this.orderService = orderService;
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
    @GetMapping("/profile/get-order-by-date")
    public ResponseEntity<?> findOrdersByDate(@RequestParam LocalDate from, @RequestParam LocalDate to,HttpSession session){
        Object email = session.getAttribute("email");
        if(email == null){
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).body("Please: Login");
        }
        List<UserOrdersDto> orders =  userService.findOrderByDate(email.toString(), from, to);
        return ResponseEntity.ok().body(orders);
    }
    @GetMapping("/profile/search-orders")
    public ResponseEntity<?> searchOrder(@RequestParam String key, HttpSession session){
        Object email = session.getAttribute("email");
        if(email == null){
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).body("Please: Login");
        }
        List<UserOrdersDto> orders =  userService.findOrderByKey(email.toString(), key);
        return ResponseEntity.ok().body(orders);
    }
    @PostMapping("/profile/update-info")
    public ResponseEntity<?> updateInfo(@RequestBody User user){
        ResponseDto response = userService.updateUserInfo(user);
        return ResponseEntity.ok().body(response);
    }
    @PostMapping("/add-orders-to-session")
    public ResponseEntity<?> addProductToSession(@RequestBody List<OrderRequestDto> orderRequestDtos, HttpSession session){
        ResponseDto response = productVariantService.checkBeforeBuy(orderRequestDtos);
        if(response.getError() == true){
            return ResponseEntity.status(HttpStatusCode.valueOf(409)).body(response);
        }
        session.setAttribute("order-summary", orderRequestDtos);
        return ResponseEntity.ok().body(response);
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
    @DeleteMapping("/cart/delete")
    public ResponseEntity<?> deleteCart(@RequestBody Integer productVariantId,HttpSession session){
        Object email = session.getAttribute("email");
        if(email == null)return ResponseEntity.status(HttpStatusCode.valueOf(401)).body("Please: Login");

        ResponseDto response = cartService.deleteFromCart(productVariantId, email.toString());
        return ResponseEntity.ok().body(response);
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
    public ResponseEntity<?> cancelOrder(@RequestBody Integer orderId){
        ResponseDto responseDto = new ResponseDto();
        responseDto = orderService.cancelOrder(orderId);   
        if(responseDto.getError() == true&& responseDto.getMessage().equals("Đơn hàng trống"))
        return ResponseEntity.badRequest().body(responseDto);
        return ResponseEntity.ok().body(responseDto);
    }
    @PostMapping("/update-cart-quantity")
    public ResponseEntity<?> updateCartQuantity(@RequestBody CartQuantityUpdateDto cartQuantityUpdateDto,HttpSession session){
        String email = session.getAttribute("email").toString();
        cartQuantityUpdateDto.setEmail(email);
        Integer quantity = cartService.updateCartQuantity(cartQuantityUpdateDto);
        return ResponseEntity.ok().body(quantity);
    }
    @PostMapping("/delete-address")
    public ResponseEntity<?> deleteAddress(@RequestBody Integer addressId){
        ResponseDto response = addressService.deleteAddress(addressId);
        return ResponseEntity.ok().body(response);
    }
    @PostMapping("/add-address")
    public ResponseEntity<?> addAddress(@RequestBody Address address,HttpSession session){
        if(session.getAttribute("email") == null)
            return ResponseEntity.badRequest().body("Please: Log In");
        String email = session.getAttribute("email").toString();
        address.setEmail(email);
        ResponseDto response = addressService.addAddress(address);
        return ResponseEntity.ok().body(response);
    }
    @PatchMapping("/update-address")
    public ResponseEntity<?> updateAddress(@RequestBody Address address,HttpSession session){
        if(session.getAttribute("email") == null)
            return ResponseEntity.badRequest().body("Please: Log In");
        String email = session.getAttribute("email").toString();
        address.setEmail(email);
        ResponseDto response = addressService.updateAddress(address);
        return ResponseEntity.ok().body(response);
    }
}
