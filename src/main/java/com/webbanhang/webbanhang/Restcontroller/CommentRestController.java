package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.CustomException.DuplicateCommentException;
import com.webbanhang.webbanhang.Dto.Shopping.CommentDto;
import com.webbanhang.webbanhang.Entity.Comment;
import com.webbanhang.webbanhang.Service.CommentService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentRestController {
    @Autowired private CommentService commentService;

    @GetMapping("/find-all")
    public List<CommentDto> findAllCommentsByProductId(@RequestParam Integer productId){
        return commentService.findAllCommentsByProductId(productId);
    }
    @PostMapping("rating")
    public ResponseEntity<?> rating(@RequestBody Comment comment){
        comment.getComment();
        try {
            commentService.saveComment(comment);
        }catch(DuplicateCommentException e){
            return ResponseEntity.badRequest().body("Bạn đã hoàn thành đánh giá trước đó");

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Sever error");
        }
        return ResponseEntity.ok().body(null);
    }
}
