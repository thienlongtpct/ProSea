package com.webproject.project_search.Repository;

import com.webproject.project_search.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface RequestRepository extends JpaRepository<Request, Integer> {
    Set<Request> findAllByProject(Project project);
    Boolean existsByUserAndProject(User user, Project project);
    Optional<Request> findByUserAndProject(User user, Project project);
}