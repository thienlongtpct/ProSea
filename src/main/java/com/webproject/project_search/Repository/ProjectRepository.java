package com.webproject.project_search.Repository;

import com.webproject.project_search.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface ProjectRepository  extends JpaRepository<Project, Integer> {

}
