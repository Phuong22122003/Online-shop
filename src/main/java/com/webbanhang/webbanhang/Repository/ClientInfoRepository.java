package com.webbanhang.webbanhang.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.CLIENT_INFO;


@Repository
public interface ClientInfoRepository extends JpaRepository<CLIENT_INFO,Integer> {
    @Query("FROM CLIENT_INFO WHERE username = :username")
    public CLIENT_INFO  findByUsername(@Param("username") String username);
    @Query("FROM CLIENT_INFO WHERE id = :clientId")
    public CLIENT_INFO  findByClientId(@Param("clientId") Integer clientId);
    @Query("FROM CLIENT_INFO WHERE email = :email")
    public CLIENT_INFO  findByEmail(@Param("email") String email);

    @Modifying
    @Query("UPDATE CLIENT_INFO set username = :username,isEditUsername = true where email=:email")
    public void updateUsername(@Param("username")String username,@Param("email")String email);

    @Modifying
    @Query("UPDATE CLIENT_INFO set firstname=:firstname, lastname =:lastname,phoneNumber =:phoneNumber where email=:email")
    public void updateProfile(@Param("firstname")String firstNam,@Param("lastname")String lastname,@Param("phoneNumber") String phoneNumer,@Param("email")String email);
}
