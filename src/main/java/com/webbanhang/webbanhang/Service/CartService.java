package com.webbanhang.webbanhang.Service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.webbanhang.webbanhang.Dto.CartDto;
import com.webbanhang.webbanhang.Entity.CART;
import com.webbanhang.webbanhang.Entity.CART_KEY;
import com.webbanhang.webbanhang.Entity.PRODUCT;
import com.webbanhang.webbanhang.Repository.CartRepository;
import jakarta.transaction.Transactional;

@Service
public class CartService {
    @Autowired private CartRepository cartRepository;
    @Autowired private ProductService productService;
    public List<CartDto> getClientCart(Integer clientId){
        List<CART> clientCarts = cartRepository.getClientCartByClientId(clientId);
        List<CartDto> clientCartDto = new ArrayList<>();
        clientCarts.forEach((item)->{
            clientCartDto.add(new CartDto(item.getProduct().getImagePath(), item.getProductId(),item.getProduct().getName(),item.getAddress(),item.getProduct().getPrice(),item.getQuantity()));
        });
        return clientCartDto;
    }
    public List<CartDto> buyProduct(Integer clientId,String productId,Integer quantity,String address){
        List<CART> clientCarts = cartRepository.getClientCartByClientId(clientId);
        List<CartDto> clientCartDto = new ArrayList<>();
        PRODUCT product = productService.getDetailProduct(productId);
        clientCartDto.add(new CartDto(product.getImagePath(), productId, product.getName(),address, product.getPrice(), quantity));
        clientCarts.forEach((item)->{
            if(!item.getProductId().equals(productId))
                clientCartDto.add(new CartDto(item.getProduct().getImagePath(), item.getProductId(),item.getProduct().getName(),item.getAddress(),item.getProduct().getPrice(),item.getQuantity()));
        });
        return clientCartDto;
    }
    @Transactional
    public void addProductToCart(CART cart){
        cartRepository.save(cart);
    }
    @Transactional
    public void removeProduct(String productId,Integer clientId){
        CART_KEY key = new CART_KEY();
        key.setClientId(clientId);
        key.setProductDetailId(productId);
        cartRepository.deleteById(key);
    }
}
