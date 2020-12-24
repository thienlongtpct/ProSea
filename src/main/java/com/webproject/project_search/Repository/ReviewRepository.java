package com.webproject.project_search.Repository;

import com.webproject.project_search.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Optional<Review> findById(int id);
}