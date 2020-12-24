//package com.webproject.project_search.Model;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//
//import javax.persistence.*;
//
//@Entity
//@EnableAutoConfiguration
//@Table(name = "applies")
//public class Apply extends AuditModel {
//    @Id
//    @GeneratedValue(strategy= GenerationType.IDENTITY)
//    private int id;
//
//    @JsonIgnore
//    @ManyToOne
//    private final Developer developer;
//
//    @Transient
//    private String developerName;
//
//    @Transient
//    private String developerUsername;
//
//    @JsonIgnore
//    @ManyToOne
//    private final Company company;
//
//    @Transient
//    private String companyName;
//
//    @Transient
//    private String companyUsername;
//
//    public Apply() {
//        this.developer = null;
//        this.company = null;
//    }
//
//    public Apply(Developer developer, Company company) {
//        this.developer = developer;
//        this.company = company;
//    }
//
//    @PostLoad
//    private void postLoad() {
//        assert developer != null;
//        this.developerName = developer.getName().equals("") ? developer.getUsername() : developer.getName();
//        this.developerUsername = developer.getUsername();
//        assert company != null;
//        this.companyName = company.getName();
//        this.companyUsername = company.getName().equals("") ? company.getUsername() : company.getName();
//    }
//
//    public int getId() {
//        return id;
//    }
//
//    public Developer getDeveloper() {
//        return developer;
//    }
//
//    public String getDeveloperName() {
//        return developerName;
//    }
//
//    public String getDeveloperUsername() {
//        return developerUsername;
//    }
//
//    public Company getCompany() {
//        return company;
//    }
//
//    public String getCompanyName() {
//        return companyName;
//    }
//
//    public String getCompanyUsername() {
//        return companyUsername;
//    }
//}