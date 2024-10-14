package com.webbanhang.webbanhang.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.webbanhang.webbanhang.Entity.User;



@Repository
public interface UserRepository extends JpaRepository<User,String>{
    @Query(value = "exec find_user_orders_by_email :email",nativeQuery = true)
    public List<Map<String,Object>> findUserOdersByEmail(String email);

    @Query(value = "From User where email=:email")
    public User findUserByEmail(String email);
}
