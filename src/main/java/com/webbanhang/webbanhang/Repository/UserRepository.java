package com.webbanhang.webbanhang.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.webbanhang.webbanhang.Entity.User;



@Repository
public interface UserRepository extends JpaRepository<User,String>{
    
}
