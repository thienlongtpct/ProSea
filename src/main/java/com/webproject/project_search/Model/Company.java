package com.webproject.project_search.Model;

import com.fasterxml.jackson.annotation.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@EnableAutoConfiguration
@DiscriminatorValue(value = "company")
public class Company extends User {
    public Company() {

    }
    public Company(User user) {
        super();
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.name = user.name;
        this.bio = user.bio;
        this.contact = user.contact;
        this.projects = user.projects;
    }

    @OneToMany
    @JsonIgnore
    protected Set<User> developers = new HashSet<>();

    @Transient
    @JsonIgnore
    protected Set<String> developerSet = new HashSet<>();

    @PostLoad
    private void postLoad() {
        developerSet = developers.stream().map(User::getUsername).collect(Collectors.toSet());
        type = this.getClass().getAnnotation(DiscriminatorValue.class).value();
        if (avatar == null) avatar = "company.svg";
    }

    public void edit(Company otherCompany) {
        this.edit((User)otherCompany);
        developers = otherCompany.getDevelopers();
    }

    public Set<User> getDevelopers() {
        return developers;
    }
}