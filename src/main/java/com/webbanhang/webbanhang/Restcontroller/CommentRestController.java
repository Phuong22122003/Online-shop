package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.CommentDto;
import com.webbanhang.webbanhang.Service.CommentService;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentRestController {
    @Autowired private CommentService commentService;

    @GetMapping("/find-all")
    public List<CommentDto> findAllCommentsByProductId(@RequestParam Integer productId){
        return commentService.findAllCommentsByProductId(productId);
    }
}
