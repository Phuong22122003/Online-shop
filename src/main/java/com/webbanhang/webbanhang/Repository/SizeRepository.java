package com.webbanhang.webbanhang.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.Size;

@Repository
public interface SizeRepository extends JpaRepository<Size,Integer> {
    @Query(value = "EXEC find_sizes :productId",nativeQuery =  true)
    public List<Size> findSizesByProductId(Integer productId);
}
