package com.webbanhang.webbanhang.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.SELLING_DETAIL;
import com.webbanhang.webbanhang.Entity.SELLING_DETAIL_KEY;

import java.util.List;
import java.util.Map;
@Repository
public interface SellingDetailRepository extends JpaRepository<SELLING_DETAIL,SELLING_DETAIL_KEY>{
    @Query("FROM SELLING_DETAIL where clientId=:clientId")
    public List<SELLING_DETAIL> findClientOrderByClientId(@Param("clientId") Integer clientId);

    @Query(value = "EXEC orderDetails :clientId",nativeQuery = true)
    public List<Map<String,Object>> orDetails(@Param("clientId") Integer clientId);

    @Modifying
    @Query("UPDATE SELLING_DETAIL SET status = 'CANCLE' WHERE productId=:productId AND clientId=:clientId AND address =:address AND price =:price AND quantity =:quantity AND status ='PREPAREMENT' ")
    public void cancleOrder(@Param("productId") String productId,@Param("clientId") Integer clientId, @Param("address") String address, @Param("price") Integer price, @Param("quantity")Integer quantity);
}
