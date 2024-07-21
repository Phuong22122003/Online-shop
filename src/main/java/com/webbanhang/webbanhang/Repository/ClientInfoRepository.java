package com.webbanhang.webbanhang.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
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
}
