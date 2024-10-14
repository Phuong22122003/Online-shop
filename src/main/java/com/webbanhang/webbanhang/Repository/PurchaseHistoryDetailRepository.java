package com.webbanhang.webbanhang.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.PurchaseHistoryDetail;

@Repository
public interface PurchaseHistoryDetailRepository extends JpaRepository<PurchaseHistoryDetail, Integer>{
    
}
