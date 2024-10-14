package com.webbanhang.webbanhang.Service;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webbanhang.webbanhang.CustomException.DuplicateCartException;
import com.webbanhang.webbanhang.Dto.Shopping.CartDto;
import com.webbanhang.webbanhang.Dto.User.Profile.CartQuantityUpdateDto;
import com.webbanhang.webbanhang.Entity.Cart;
import com.webbanhang.webbanhang.Repository.CartRepository;

@Service
public class CartService {
    private CartRepository cartRepository;
    private ImageService imageService;
    public CartService(ImageService imageService,CartRepository cartRepository){
        this.cartRepository = cartRepository;
        this.imageService = imageService;
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
            cart.setImagePath(imageService.getImagePath(item.get("ImagePath").toString(),""));
            cart.setLeftQuantity(item.get("LeftQuantity").toString());
            cart.setProductVariantId(item.get("ProductVariantId").toString());
            total  = Double.parseDouble(cart.getPrice()) * Double.parseDouble(cart.getQuantity());
            cart.setTotal(total.toString());
            cartDtos.add(cart);
        }
        return cartDtos;
    }
    @Transactional(rollbackFor = Exception.class)
    public Cart addToCart(Cart cart) throws Exception{
        if(cart.getEmail() == null)
            throw new IllegalArgumentException("Email is empty");
        Cart inDatabaseCart = cartRepository.findCartByEmailAndProductVariantId(cart.getEmail(), cart.getProductVariantId());
        if(inDatabaseCart!=null) {
            cart.setQuantity(inDatabaseCart.getQuantity() + cart.getQuantity());
        }
        Cart saveCart = cartRepository.save(cart);
        return saveCart;
    }
    public Integer updateCartQuantity(CartQuantityUpdateDto cartQuantityUpdateDto){
        Cart cart = new Cart();
        cart.setEmail(cartQuantityUpdateDto.getEmail());
        cart.setProductVariantId(cartQuantityUpdateDto.getProductVariantId());
        cart.setQuantity(cartQuantityUpdateDto.getQuantity());
        Cart savedCart =cartRepository.save(cart);
        return savedCart.getQuantity();
    }
}
