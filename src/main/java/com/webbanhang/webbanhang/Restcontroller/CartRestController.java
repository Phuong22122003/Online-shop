package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.CartDto;
import com.webbanhang.webbanhang.Entity.CART;
import com.webbanhang.webbanhang.Service.CartService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class CartRestController {
    @Autowired private CartService cartService;
    @GetMapping("/cart")
    public List<CartDto> getClientCart(HttpSession session){
        Integer clientId = (Integer)session.getAttribute("clientId");
        return cartService.getClientCart(clientId);
    }
    @GetMapping("/cart/buy")
    public List<CartDto> buyProduct(HttpSession session,@RequestParam("productId") String productId,@RequestParam("quantity") Integer quantity,@RequestParam("address")String address){
        Integer clientId = (Integer)session.getAttribute("clientId");
        return cartService.buyProduct(clientId,productId,quantity,address);
    }
    @PostMapping("/add-product")
    public ResponseEntity<String> addProductToCart(@RequestBody Map<String,Object> data,HttpSession session){
        if(data==null) return ResponseEntity.badRequest().body("Vui lòng nhập đầy đủ thông tin");
        Integer clientId = (Integer)session.getAttribute("clientId");
        CART cart = new CART();
        cart.setClientId(clientId);
        cart.setProductId((String)data.get("productId"));
        cart.setAddress((String)data.get("address"));
        cart.setQuantity(Integer.valueOf(data.get("quantity").toString()));
        try{
            cartService.addProductToCart(cart);
        }
        catch(Exception ex){
             return ResponseEntity.badRequest().body("Lưu thất bại" + ex.getMessage());
        }
        return ResponseEntity.ok().body("Lưu thành công");
    }
    @DeleteMapping("/cart/remove/{productId}")
    public ResponseEntity<String> removeProduct(@PathVariable("productId") String productId,HttpSession session){
        Integer clientId = Integer.valueOf(session.getAttribute("clientId").toString());
        try{
            cartService.removeProduct(productId, clientId);
        }
        catch(Exception ex){
            return ResponseEntity.badRequest().body("Không thể xóa" + ex.getMessage());
        }
        return ResponseEntity.ok().body("Xóa thành công");
    }
}
