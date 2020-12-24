//package com.webproject.project_search.Repository;
//
//import com.webproject.project_search.Model.*;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.Optional;
//import java.util.Set;
//
//public interface RecruitRepository extends JpaRepository<Recruit, Integer> {
//    Set<Recruit> findAllByDeveloper(Developer developer);
//    Boolean existsByDeveloperAndCompany(Developer developer, Company company);
//    Optional<Recruit> findByDeveloperAndCompany(Developer developer, Company company);
//}