package com.webbanhang.webbanhang.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.SubCategory;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory,Integer>{
    
}
