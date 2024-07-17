package com.webbanhang.webbanhang.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.SELLING_DETAIL;
import com.webbanhang.webbanhang.Entity.SELLING_DETAIL_KEY;

@Repository
public interface SellingDetailRepository extends JpaRepository<SELLING_DETAIL,SELLING_DETAIL_KEY>{
    
}
