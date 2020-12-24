package com.webproject.project_search.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;

@Entity
@EnableAutoConfiguration
@Table(name = "reviews")
public class Review extends AuditModel {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @ManyToOne
    private User user;

    @Transient
    private String userName;

    @Transient
    private String userUsername;

    @Transient
    private String userAvatar;

    @JsonIgnore
    @ManyToOne
    private Developer owner;

    @Transient
    private String ownerUsername;

    private int rating;

    @Lob
    @Column(name = "review", length = 1048576)
    private String review;

    @PostLoad
    private void postLoad() {
        userName = user.getName().equals("") ? user.getUsername() : user.getName();
        userUsername = user.getUsername();
        userAvatar = user.getAvatar();
        ownerUsername = owner.getUsername();
    }

    public void edit(Review otherReview) {
        rating = otherReview.rating;
        review = otherReview.review;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserUsername() {
        return userUsername;
    }

    public void setUserUsername(String userUsername) {
        this.userUsername = userUsername;
    }

    public String getUserAvatar() {
        return userAvatar;
    }

    public void setUserAvatar(String userAvatar) {
        this.userAvatar = userAvatar;
    }

    public Developer getOwner() {
        return owner;
    }

    public void setOwner(Developer owner) {
        this.owner = owner;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}