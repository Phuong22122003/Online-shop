package com.webbanhang.webbanhang.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.webbanhang.webbanhang.Entity.PurchaseHistory;

public interface PurchaseHistoryRepository extends JpaRepository<PurchaseHistory,Integer> {

    //OrderId int, Status -string, DeliveryFee - float, PurchasingDate localdatetime, Address - string, Phone - string, Fullname - string,
    //ProductId int, Name String, ImagePath String, Quantity int, UnitPrice Float, Size String, Color String.
    @Query(value = "Exec find_orders",nativeQuery =  true)
    public List<Map<String,Object>> findOrders();

    @Modifying
    @Query(value = "Update PurchaseHistory set status = 'Cancelled' where Id = :orderId")
    public void cancelOrder(Integer orderId);
}
