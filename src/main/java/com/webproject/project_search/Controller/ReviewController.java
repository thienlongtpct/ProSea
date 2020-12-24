package com.webproject.project_search.Controller;

import com.webproject.project_search.Model.*;
import com.webproject.project_search.Repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@Transactional
public class ReviewController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DeveloperRepository developerRepository;
    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping("/getReviews/{username}")
    public Set<Review> getReviews(@PathVariable String username) {
        Developer developer = developerRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return developer.getReviewSet().stream().map(id -> reviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .collect(Collectors.toSet());
    }

    @PostMapping("/addReview")
    public Review addReview(@RequestBody Review review) {
        User user = userRepository.findByUsername(review.getUserUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Developer developer = developerRepository.findByUsername(review.getOwnerUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        review.setUser(user);
        review.setUserName(user.getName() != null ? user.getName() : review.getUserUsername());
        review.setUserAvatar(user.getAvatar());
        review.setOwner(developer);
        review = reviewRepository.save(review);
        reviewRepository.flush();
        return review;
    }

    @PutMapping("/editReview")
    public void editReview(@RequestBody Review newReview) {
        Review review = reviewRepository.findById(newReview.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        review.edit(newReview);
    }

    @DeleteMapping("/deleteReview/{id}")
    public void deleteReview(@PathVariable int id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        reviewRepository.delete(review);
    }
}