package com.webbanhang.webbanhang.Service;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.CartDto;
import com.webbanhang.webbanhang.Repository.CartRepository;

@Service
public class CartService {
    private CartRepository cartRepository;
    public CartService(CartRepository cartRepository){
        this.cartRepository = cartRepository;
    }
    public List<CartDto> findUserCart(String email){
        List<Map<String,Object>> carts = cartRepository.findUserCart(email);
        List<CartDto> cartDtos = new ArrayList<>();
        CartDto cart = null;
        Double total = null;
        for(Map<String,Object> item : carts){
            cart = new CartDto();
            cart.setId(item.get("ProductId").toString());
            cart.setName(item.get("Name").toString());
            cart.setQuantity(item.get("Quantity").toString());
            cart.setColor(item.get("Color").toString());
            cart.setSize(item.get("Size").toString());
            cart.setPrice(item.get("Price").toString());
            cart.setImagePath(item.get("ImagePath").toString());
            cart.setLeftQuantity(item.get("LeftQuantity").toString());
            cart.setProductVariantId(item.get("ProductVariantId").toString());
            total  = Double.parseDouble(cart.getPrice()) * Double.parseDouble(cart.getQuantity());
            cart.setTotal(total.toString());
            cartDtos.add(cart);
        }
        return cartDtos;
    }
}
