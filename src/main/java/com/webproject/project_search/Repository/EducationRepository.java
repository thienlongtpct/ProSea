package com.webproject.project_search.Repository;

import com.webproject.project_search.Model.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EducationRepository extends JpaRepository<Education, Integer> {
    Optional<Education> findById(int id);
}
