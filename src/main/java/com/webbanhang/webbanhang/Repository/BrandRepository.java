package com.webbanhang.webbanhang.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand,Integer> {
    
}
