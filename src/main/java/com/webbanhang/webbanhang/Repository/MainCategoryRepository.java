package com.webbanhang.webbanhang.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.webbanhang.webbanhang.Entity.MainCategory;

@Repository
public interface MainCategoryRepository extends JpaRepository<MainCategory,Integer>{

}
