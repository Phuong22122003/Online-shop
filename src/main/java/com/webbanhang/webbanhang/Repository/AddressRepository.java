package com.webbanhang.webbanhang.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.Address;
@Repository
public interface AddressRepository extends JpaRepository<Address,Integer>{
    @Query(value = "Exec find_address_by_email :email", nativeQuery = true)
    public List<Address> findAddressByEmail(String email);
    @Query(value = "Exec find_address_by_purchase_history_id :purchaseHistoryId",nativeQuery =  true)
    public Address findAddressByPurchasingId(Integer purchaseHistoryId);

    @Query(value = "From Address where id = :id")
    public Address findAddressById(Integer id);
}
