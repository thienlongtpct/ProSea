package com.webproject.project_search.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;

@Entity
@EnableAutoConfiguration
@Table(name = "requests")
public class Request extends AuditModel {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @ManyToOne
    private final User user;

    @Transient
    private String userName;

    @Transient
    private String userUsername;

    @JsonIgnore
    @ManyToOne
    private final Project project;

    @Transient
    private String projectName;

    public Request() {
        this.user = null;
        this.project = null;
    }

    public Request(User user, Project project) {
        this.user = user;
        this.project = project;
    }

    @PostLoad
    private void postLoad() {
        assert user != null;
        this.userName = user.getName().equals("") ? user.getUsername() : user.getName();
        this.userUsername = user.getUsername();
        assert project != null;
        this.projectName = project.getName();
    }

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserUsername() {
        return userUsername;
    }

    public Project getProject() {
        return project;
    }

    public String getProjectName() {
        return projectName;
    }
}