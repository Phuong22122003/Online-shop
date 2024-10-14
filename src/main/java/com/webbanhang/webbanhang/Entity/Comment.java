package com.webbanhang.webbanhang.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "Comment")
    private String comment;

    @Column(name = "Star")
    private Integer star;

    @Column(name = "Purchase_history_detail_id")
    private Integer purchaseHistoryDetailId;

    @Column(name = "Comment_date")
    private LocalDateTime commentDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getStar() {
        return star;
    }

    public void setStar(Integer star) {
        this.star = star;
    }


    public LocalDateTime getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(LocalDateTime commentDate) {
        this.commentDate = commentDate;
    }

    public Integer getPurchaseHistoryDetailId() {
        return purchaseHistoryDetailId;
    }

    public void setPurchaseHistoryDetailId(Integer purchaseHistoryDetailId) {
        this.purchaseHistoryDetailId = purchaseHistoryDetailId;
    }

    
}
