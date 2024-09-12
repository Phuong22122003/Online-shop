package com.webbanhang.webbanhang.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.webbanhang.webbanhang.Entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Integer>{
    @Query(value = "Exec find_all_comments :productId ",nativeQuery =  true)
    public List<Map<String,Object>> findAllCommentsByProductId(@Param("productId") Integer productId);
}
