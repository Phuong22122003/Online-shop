package com.webbanhang.webbanhang.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.PRODUCT;


@Repository
public interface ProductRepository extends JpaRepository<PRODUCT,String>{
    @Query("FROM PRODUCT WHERE productId=:productId")
    public PRODUCT findByProductId(@Param("productId") String productId); 

    @Query(value = "SELECT * FROM PRODUCT WHERE PRODUCT_ID=:productId AND CLIENT_ID = :clientId",nativeQuery =  true)
    public PRODUCT findByProductIdAndClientId(@Param("productId") String productId,@Param("clientId") Integer clientId); 

    @Query("FROM PRODUCT WHERE name LIKE %:keyword%")
    public List<PRODUCT> findProductBykeyword(@Param("keyword") String keyword);
    @Query("FROM PRODUCT WHERE client.id =:clientId")
    public List<PRODUCT> getClientStock(@Param("clientId") Integer clientId);
    
    @Modifying
    @Query("UPDATE PRODUCT SET price =:price WHERE productId =:productId")
    public void updatePrice(@Param("price") Integer price,@Param("productId") String productId);

    @Modifying
    @Query("UPDATE PRODUCT SET quantity = :quantity WHERE productId =:productId")
    public void updateQuantity(@Param("quantity") Integer quantity,@Param("productId")String productId);

    @Modifying
    @Query("UPDATE PRODUCT  SET description = :description WHERE productId =:productId")
    public void updateDescription(@Param("description") String description, @Param("productId") String productId);

    @Modifying
    @Query("UPDATE PRODUCT  SET name = :name WHERE productId =:productId")
    public void updateName(@Param("name") String name, @Param("productId") String productId);

    @Modifying
    @Query(value = "UPDATE PRODUCT  SET IS_DELETED = 1 WHERE PRODUCT_ID =:productId and CLIENT_ID = :clientId",nativeQuery = true)
    public void delete(@Param("productId") String productId, @Param("clientId") Integer clientId);
    @Modifying
    @Query(value = "UPDATE PRODUCT  SET IS_DELETED = 0 WHERE PRODUCT_ID =:productId and CLIENT_ID = :clientId",nativeQuery = true)
    public void resell(@Param("productId") String productId, @Param("clientId") Integer clientId);
}
