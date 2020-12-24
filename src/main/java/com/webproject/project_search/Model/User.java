package com.webproject.project_search.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@EnableAutoConfiguration
@Table(name = "users")
@Inheritance
@DiscriminatorColumn(name = "type")
public class User extends AuditModel {
    public User() {

    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    protected int id;

    @Column(unique = true, nullable = false)
    protected String username;

    @Column(unique = true, nullable = false)
    protected String email;

    @Column(nullable = false)
    protected String password;

    protected String name = "";

    protected String bio = "";

    protected String avatar;
    
    @Embedded
    protected Contact contact = new Contact();

    @JsonIgnore
    @ManyToMany
    protected Set<Project> projects = new HashSet<>();

    @Transient
    protected int projectSize;

    @Transient
    protected String type;

    protected void edit(User otherUser) {
        email = otherUser.email;
        name = otherUser.name;
        password = otherUser.password;
        bio = otherUser.bio;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getBio() {
        return bio;
    }

    public Contact getContact() {
        return contact;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public int getProjectSize() {
        return projectSize;
    }

    public String getType() {
        return type;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    public void addProject(Project project) {
        this.projects.add(project);
    }

    public void removeProject(Project project) {
        this.projects.remove(project);
    }
}
