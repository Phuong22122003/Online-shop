package com.webbanhang.webbanhang.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.Product;

@Repository
public interface ProductRepsitory extends JpaRepository<Product,Integer> {
    @Query(value = "EXEC find_best_seller",nativeQuery =  true)
    public List<Map<String,Object>> bestSeller();

    @Query(value = "EXEC find_all_products_for_search",nativeQuery =  true)
    public List<Map<String,Object>> findAllProductsForSearch();

    @Query(value = "Exec find_all_products_of_category :categoryId",nativeQuery = true)
    public List<Map<String,Object>> findAllProductsOfCategory(Integer categoryId);
    /*
     * Find product include id Integer, name String, cover image path String, price String (100-200)  
     */
    @Query(value = "EXEC find_all_products",nativeQuery =  true)
    public List<Map<String,Object>> findAllProducts();

    // ProductId, Name,ImagePath, SoldQuantity, RemainingQuantity, DeletedFlat
    @Query(value = "Exec find_inventory",nativeQuery =  true)
    public List<Map<String,Object>> findInventory();
}
