package com.webproject.project_search.Repository;

import com.webproject.project_search.Model.Framework;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FrameworkRepository extends JpaRepository<Framework, Integer> {
    Framework findById(int id);
}