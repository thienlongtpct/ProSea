package com.webproject.project_search.Repository;

import com.webproject.project_search.Model.Employment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmploymentRepository extends JpaRepository<Employment, Integer> {
    Optional<Employment> findById(int id);
}
