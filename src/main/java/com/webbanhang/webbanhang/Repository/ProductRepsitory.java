package com.webbanhang.webbanhang.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.Product;

@Repository
public interface ProductRepsitory extends JpaRepository<Product,Integer> {
    // @Query(value = "Exec find_lowest_price_of_product:productId",nativeQuery = true)
    // public Double findLowestPrice(Integer productId);

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
    @Query(value = "Exec find_inventory :pageNumber,:pageSize",nativeQuery =  true)
    public List<Map<String,Object>> findInventory(Integer pageNumber,Integer pageSize);
    
    
    @Query(value = "Exec find_all_product_by_subcategory_name :subCategoryName,:male,:female",nativeQuery =  true)
    public List<Product> findProductByCategoryName(String subCategoryName,String male,String female);

    @Modifying 
    @Query(value = "Update Product set deletedFlat=:flat where id =:productId")
    public void updateProductFlat(Integer productId,Boolean flat);

}
