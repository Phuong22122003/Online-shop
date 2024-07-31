package com.webbanhang.webbanhang.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.SELLING_DETAIL;
import com.webbanhang.webbanhang.Entity.SELLING_DETAIL_KEY;
import java.util.List;
@Repository
public interface SellingDetailRepository extends JpaRepository<SELLING_DETAIL,SELLING_DETAIL_KEY>{
    @Query("FROM SELLING_DETAIL where clientId=:clientId")
    public List<SELLING_DETAIL> findClientOrderByClientId(@Param("clientId") Integer clientId);
}
