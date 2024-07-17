package com.webbanhang.webbanhang.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.PRODUCT;


@Repository
public interface ProductRepository extends JpaRepository<PRODUCT,String>{
    @Query("FROM PRODUCT WHERE productId=:productId")
    public PRODUCT findByProductId(@Param("productId") String productId); 
    @Query("FROM PRODUCT WHERE name LIKE %:keyword%")
    public List<PRODUCT> findProductBykeyword(@Param("keyword") String keyword);
}
