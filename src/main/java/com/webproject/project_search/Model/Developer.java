package com.webproject.project_search.Model;

import com.fasterxml.jackson.annotation.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@EnableAutoConfiguration
@DiscriminatorValue(value = "developer")
public class Developer extends User {
    public Developer() {

    }
    public Developer(User user) {
        super();
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.name = user.name;
        this.bio = user.bio;
        this.contact = user.contact;
        this.projects = user.projects;
        this.projectSize = user.projectSize;
    }

    enum EducationType {
        Null,
        Undergraduate,
        Graduate,
        Postgraduate
    }

    @Enumerated(EnumType.STRING)
    private EducationType education = EducationType.Null;

    enum RoleType {
        Null,
        Intern,
        JuniorDeveloper,
        Developer,
        SeniorDeveloper,
        TeamLeader
    }

    @Enumerated(EnumType.STRING)
    private RoleType role = RoleType.Null;

    enum ExperienceType {
        Null,
        Years01,
        Years12,
        Years24,
        Years46,
        Years610,
        Years1015,
        Years15up
    }

    @Enumerated(EnumType.STRING)
    private ExperienceType experience = ExperienceType.Null;

    @JsonIgnore
    @ManyToMany
    private Set<Speciality> specialities = new HashSet<>();

    @Transient
    private Set<Integer> specialitySet = new HashSet<>();

    @JsonIgnore
    @ManyToMany
    private Set<Language> languages = new HashSet<>();

    @Transient
    private Set<Integer> languageSet = new HashSet<>();

    @JsonIgnore
    @ManyToMany
    private Set<Framework> frameworks = new HashSet<>();

    @Transient
    private Set<Integer> frameworkSet = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "developer")
    private Set<Employment> employments = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "developer")
    private Set<Education> educations = new HashSet<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "bookmarks",
            joinColumns = @JoinColumn(name = "developers_id"),
            inverseJoinColumns = @JoinColumn(name = "projects_id"))
    private Set<Project> bookmarks = new HashSet<>();

    @Transient
    @JsonIgnore
    private Set<Integer> bookmarkSet = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "owner")
    private Set<Review> reviews;

    @Transient
    @JsonIgnore
    private Set<Integer> reviewSet = new HashSet<>();

    @Transient
    private int reviewSize;

    @PostLoad
    private void postLoad() {
        type = this.getClass().getAnnotation(DiscriminatorValue.class).value();
        specialitySet = specialities.stream().map(Speciality::getId).collect(Collectors.toSet());
        languageSet = languages.stream().map(Language::getId).collect(Collectors.toSet());
        frameworkSet = frameworks.stream().map(Framework::getId).collect(Collectors.toSet());
        bookmarkSet = bookmarks.stream().map(Project::getId).collect(Collectors.toSet());
        reviewSet = reviews.stream().map(Review::getId).collect(Collectors.toSet());
        projectSize = projects.size();
        reviewSize = reviews.size();
        if (avatar == null) avatar = "developer.svg";
    }

    public void edit(Developer otherDeveloper) {
        this.edit((User)otherDeveloper);
        education = otherDeveloper.getEducation();
        role = otherDeveloper.getRole();
        experience = otherDeveloper.getExperience();
    }

    public EducationType getEducation() {
        return education;
    }

    public void setEducation(EducationType education) {
        this.education = education;
    }

    public RoleType getRole() {
        return role;
    }

    public void setRole(RoleType role) {
        this.role = role;
    }

    public ExperienceType getExperience() {
        return experience;
    }

    public void setExperience(ExperienceType experience) {
        this.experience = experience;
    }

    public Set<Speciality> getSpecialities() {
        return specialities;
    }

    public void setSpecialities(Set<Speciality> specialities) {
        this.specialities = specialities;
    }

    public Set<Integer> getSpecialitySet() {
        return specialitySet;
    }

    public void setSpecialitySet(Set<Integer> specialitySet) {
        this.specialitySet = specialitySet;
    }

    public Set<Language> getLanguages() {
        return languages;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }

    public Set<Integer> getLanguageSet() {
        return languageSet;
    }

    public void setLanguageSet(Set<Integer> languageSet) {
        this.languageSet = languageSet;
    }

    public Set<Framework> getFrameworks() {
        return frameworks;
    }

    public void setFrameworks(Set<Framework> frameworks) {
        this.frameworks = frameworks;
    }

    public Set<Integer> getFrameworkSet() {
        return frameworkSet;
    }

    public void setFrameworkSet(Set<Integer> frameworkSet) {
        this.frameworkSet = frameworkSet;
    }

    public Set<Employment> getEmployments() {
        return employments;
    }

    public void setEmployments(Set<Employment> employments) {
        this.employments = employments;
    }

    public Set<Education> getEducations() {
        return educations;
    }

    public void setEducations(Set<Education> educations) {
        this.educations = educations;
    }

    public Set<Project> getBookmarks() {
        return bookmarks;
    }

    public void setBookmarks(Set<Project> bookmarks) {
        this.bookmarks = bookmarks;
    }

    public Set<Integer> getBookmarkSet() {
        return bookmarkSet;
    }

    public void setBookmarkSet(Set<Integer> bookmarkSet) {
        this.bookmarkSet = bookmarkSet;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    public Set<Integer> getReviewSet() {
        return reviewSet;
    }

    public void setReviewSet(Set<Integer> reviewSet) {
        this.reviewSet = reviewSet;
    }

    public int getReviewSize() {
        return reviewSize;
    }

    public void setReviewSize(int reviewSize) {
        this.reviewSize = reviewSize;
    }
}