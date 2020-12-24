package com.webproject.project_search.Model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Embeddable;

@Embeddable
public class Contact {
    @JsonProperty("city")
    private String city;

    @JsonProperty("telephone")
    private String telephone;

    @JsonProperty("github")
    private String github;

    @JsonProperty("gitlab")
    private String gitlab;

    @JsonProperty("facebook")
    private String facebook;

    @JsonProperty("instagram")
    private String instagram;

    @JsonProperty("vk")
    private String vk;

    public Contact() {
        this.city = "";
        this.telephone = "";
        this.github = "";
        this.gitlab = "";
        this.facebook = "";
        this.instagram = "";
        this.vk = "";
    }

    public void edit(String city, String telephone, String github, String gitlab, String facebook, String instagram, String vk) {
        this.city = city;
        this.telephone = telephone;
        this.github = github;
        this.gitlab = gitlab;
        this.facebook = facebook;
        this.instagram = instagram;
        this.vk = vk;
    }
}