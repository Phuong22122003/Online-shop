package com.webbanhang.webbanhang.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.ProductVariant;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, Integer>{
    @Query(value = "Select * from ProductVariants where Product_id = :productId",nativeQuery=true)
    public List<ProductVariant> findAllByProductVariantsByProductId(Integer productId);
    @Query(value = "Exec find_product_variant_by_id :id",nativeQuery=true)
    public Map<String,Object> findProductVariantById(Integer id);

    /**
     * 
     * @param purchasingId
     * @return
     * Name = Products.Name, ProductId = ProductVariants.Id, Quantity = PurchaseHistoryDetails.Quantity,
     * Price = PurchaseHistoryDetails.Unit_price, Category = SubCategories.Name
     */
    @Query(value = "Exec find_product_info_of_order :purchasingId",nativeQuery =  true)
    public List<Map<String,Object>> findProductInforOfOrder(Integer purchasingId);

    @Modifying
    @Query(value = "EXEC subtract_product_variant_quantity :productVariantId , :soldQuantity",nativeQuery = true)
    public void subtractProductVariantQuantity(Integer productVariantId, Integer soldQuantity);

    /**
     * restore quantity of product variant after user cancelled order
     * @param orderId
     */
    @Modifying
    @Query(value = "EXEC restore_product_quantity :orderId",nativeQuery = true)
    public void restoreProductQuantity(Integer orderId);
}
