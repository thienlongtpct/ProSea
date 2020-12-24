package com.webproject.project_search.Repository;

import com.webproject.project_search.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BaseUserRepository<T extends User> extends JpaRepository<T, Integer> {
    Optional<T> findByUsername(String username);
}
