package com.webbanhang.webbanhang.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.Color;

@Repository
public interface ColorRepository extends JpaRepository<Color,Integer> {
    
    @Query(value = "EXEC find_colors :productId",nativeQuery =  true)
    public List<Color> findColorsByProductId(Integer productId);
}
