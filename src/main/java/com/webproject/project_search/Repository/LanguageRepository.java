package com.webproject.project_search.Repository;

import com.webproject.project_search.Model.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, Integer> {
}