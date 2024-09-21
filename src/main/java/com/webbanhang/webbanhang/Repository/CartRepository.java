package com.webbanhang.webbanhang.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.webbanhang.webbanhang.Entity.Cart;
import com.webbanhang.webbanhang.Entity.CartKey;

@Repository
public interface CartRepository extends JpaRepository<Cart,CartKey>{

    @Query(value = "Exec find_user_cart :email", nativeQuery = true)
    public List<Map<String,Object>> findUserCart(String email);

}
