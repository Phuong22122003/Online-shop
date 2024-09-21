package com.webbanhang.webbanhang.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.ProductVariant;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, Integer>{
    @Query(value = "Select * from ProductVariants where Product_id = :productId",nativeQuery=true)
    public List<ProductVariant> findAllByProductVariantsByProductId(Integer productId);
    @Query(value = "Exec find_product_variant_by_id :id",nativeQuery=true)
    public Map<String,Object> findProductVariantById(Integer id);
}
