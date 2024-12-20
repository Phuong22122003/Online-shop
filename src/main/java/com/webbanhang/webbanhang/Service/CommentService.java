package com.webbanhang.webbanhang.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.CustomException.DuplicateCommentException;
import com.webbanhang.webbanhang.Dto.Shopping.CommentDto;
import com.webbanhang.webbanhang.Entity.Comment;
import com.webbanhang.webbanhang.Repository.CommentRepository;

@Service
public class CommentService {
    @Autowired private CommentRepository commentRepository;

    public List<CommentDto> findAllCommentsByProductId(Integer productId){
        List<Map<String,Object>> rawData = commentRepository.findAllCommentsByProductId(productId);
        List<CommentDto> comments = new ArrayList<>();

        rawData.forEach(item->{
            CommentDto comment = new CommentDto();
            comment.setComment(item.get("Comment").toString());
            comment.setEmail(item.get("Email").toString());
            comment.setStar(Integer.parseInt(item.get("Star").toString()));
            comment.setCommentDate(item.get("CommentDate").toString());
            comments.add(comment);
        });
        return comments;
    }
    public void saveComment(Comment comment) throws Exception{
        if(comment.getCommentDate() == null){
            comment.setCommentDate(LocalDateTime.now());
        }
        if(commentRepository.findCommentByPurchaseHistoryDetailId(comment.getPurchaseHistoryDetailId())==null)
            commentRepository.save(comment);
        else throw new DuplicateCommentException("Can not save duplicated comment");
    }
}
