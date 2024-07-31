package com.webbanhang.webbanhang.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.CART;
import com.webbanhang.webbanhang.Entity.CART_KEY;
@Repository
public interface CartRepository extends JpaRepository<CART,CART_KEY>{
    @Query("From CART where clientId =:clientId")
    public List<CART> getClientCartByClientId(@Param("clientId") Integer clientId);
}
