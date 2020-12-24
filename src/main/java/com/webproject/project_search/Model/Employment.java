package com.webproject.project_search.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.util.Date;

@Entity
@EnableAutoConfiguration
@Table(name = "employments")
public class Employment {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String name;

    private String company; 

    private Date startAt;

    private Date endAt;

    private String describe;

    @JsonIgnore
    @ManyToOne
    private Developer developer;

    public void edit(Employment otherJob) {
        name = otherJob.getName();
        company = otherJob.getCompany();
        startAt = otherJob.getStartAt();
        endAt = otherJob.getEndAt();
        describe = otherJob.getDescribe();
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

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
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

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public Developer getDeveloper() {
        return developer;
    }

    public void setDeveloper(Developer developer) {
        this.developer = developer;
    }
}