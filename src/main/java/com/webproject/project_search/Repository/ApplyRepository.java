//package com.webproject.project_search.Repository;
//
//import com.webproject.project_search.Model.*;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.Optional;
//import java.util.Set;
//
//public interface ApplyRepository extends JpaRepository<Apply, Integer> {
//    Set<Apply> findAllByCompany(Company company);
//    Boolean existsByDeveloperAndCompany(Developer developer, Company company);
//    Optional<Apply> findByDeveloperAndCompany(Developer developer, Company company);
//}