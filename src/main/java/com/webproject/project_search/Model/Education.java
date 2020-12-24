package com.webproject.project_search.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.util.Date;
@Entity
@EnableAutoConfiguration
@Table(name = "educations")
public class Education {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String name;

    private String school;

    private Date startAt;

    private Date endAt;

    @JsonIgnore
    @ManyToOne
    private Developer developer;

    public void edit(Education otherEducation) {
        name = otherEducation.getName();
        school = otherEducation.getSchool();
        startAt = otherEducation.getStartAt();
        endAt = otherEducation.getEndAt();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public Date getStartAt() {
        return startAt;
    }

    public void setStartAt(Date startAt) {
        this.startAt = startAt;
    }

    public Date getEndAt() {
        return endAt;
    }

    public void setEndAt(Date endAt) {
        this.endAt = endAt;
    }

    public Developer getDeveloper() {
        return developer;
    }

    public void setDeveloper(Developer developer) {
        this.developer = developer;
    }
}