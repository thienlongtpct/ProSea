package com.webproject.project_search.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@EnableAutoConfiguration
@Table(name = "projects")
public class Project extends AuditModel {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(name = "short_description", nullable = false)
    private String shortDescription = "";

    @Lob
    @Column(name = "description", length=1048576, nullable = false)
    private String description = "";

    private Date deadline = new Date();

    private int salary = 0;

    public enum Type {
        Null,
        Requested,
        InProgress,
        Complete
    }

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Type type = Type.Requested;

    @ManyToMany
    @JsonIgnore
    private Set<Speciality> specialities = new HashSet<>();

    @Transient
    private Set<Integer> specialitySet = new HashSet<>();

    @ManyToMany
    @JsonIgnore
    Set<Language> languages = new HashSet<>();
    
    @Transient
    private Set<Integer> languageSet = new HashSet<>();

    @ManyToMany
    @JsonIgnore
    Set<Framework> frameworks = new HashSet<>();

    @Transient
    private Set<Integer> frameworkSet = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "projects")
    Set<User> users = new HashSet<>();

    @Transient
    private Set<String> userSet = new HashSet<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "bookmarks",
            joinColumns = @JoinColumn(name = "projects_id"),
            inverseJoinColumns = @JoinColumn(name = "developers_id"))
    Set<Developer> developers = new HashSet<>();

    @Transient
    private Set<String> developerSet = new HashSet<>();

    @PostLoad
    private void postLoad() {
        specialitySet = specialities.stream().map(Speciality::getId).collect(Collectors.toSet());
        languageSet = languages.stream().map(Language::getId).collect(Collectors.toSet());
        frameworkSet = frameworks.stream().map(Framework::getId).collect(Collectors.toSet());
        userSet = users.stream().map(User::getUsername).collect(Collectors.toSet());
        developerSet = developers.stream().map(User::getUsername).collect(Collectors.toSet());
    }

    public void edit(Project otherProject) {
        name = otherProject.name;
        shortDescription = otherProject.shortDescription;
        description = otherProject.description;
        deadline = otherProject.deadline;
        salary = otherProject.salary;
        type = otherProject.type;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public String getDescription() {
        return description;
    }

    public Date getDeadline() {
        return deadline;
    }

    public int getSalary() {
        return salary;
    }

    public Type getType() {
        return type;
    }

    public Set<Speciality> getSpecialities() {
        return specialities;
    }

    public Set<Integer> getSpecialitySet() {
        return specialitySet;
    }

    public Set<Language> getLanguages() {
        return languages;
    }

    public Set<Integer> getLanguageSet() {
        return languageSet;
    }

    public Set<Framework> getFrameworks() {
        return frameworks;
    }

    public Set<Integer> getFrameworkSet() {
        return frameworkSet;
    }

    public Set<User> getUsers() {
        return users;
    }

    public Set<String> getUserSet() {
        return userSet;
    }

    public Set<Developer> getDevelopers() {
        return developers;
    }

    public Set<String> getDeveloperSet() {
        return developerSet;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public void setSpecialities(Set<Speciality> specialities) {
        this.specialities = specialities;
    }

    public void setSpecialitySet(Set<Integer> specialitySet) {
        this.specialitySet = specialitySet;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }

    public void setLanguageSet(Set<Integer> languageSet) {
        this.languageSet = languageSet;
    }

    public void setFrameworks(Set<Framework> frameworks) {
        this.frameworks = frameworks;
    }

    public void setFrameworkSet(Set<Integer> frameworkSet) {
        this.frameworkSet = frameworkSet;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public void setDevelopers(Set<Developer> developers) {
        this.developers = developers;
    }
}