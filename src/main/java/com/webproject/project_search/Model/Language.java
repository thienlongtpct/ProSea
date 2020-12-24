package com.webproject.project_search.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@EnableAutoConfiguration
@Table(name = "languages")
public class Language {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    private String name;

    private String icon;

    @ManyToMany(mappedBy = "languages")
    @JsonIgnore
    private Set<Developer> developers;

    @Transient
    private Set<Integer> developerSet = new HashSet<>();

    @ManyToMany(mappedBy = "languages")
    @JsonIgnore
    private Set<Project> projects;

    @Transient
    private Set<Integer> projectSet = new HashSet<>();

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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Set<Developer> getDevelopers() {
        return developers;
    }

    public void setDevelopers(Set<Developer> developers) {
        this.developers = developers;
    }

    public Set<Integer> getDeveloperSet() {
        return developerSet;
    }

    public void setDeveloperSet(Set<Integer> developerSet) {
        this.developerSet = developerSet;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    public Set<Integer> getProjectSet() {
        return projectSet;
    }

    public void setProjectSet(Set<Integer> projectSet) {
        this.projectSet = projectSet;
    }
}

