package com.webproject.project_search.Controller;

import com.webproject.project_search.Model.*;
import com.webproject.project_search.Repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

@RestController
@CrossOrigin
@Transactional
public class EducationController {
    @Autowired
    private DeveloperRepository developerRepository;
    @Autowired
    private EducationRepository educationRepository;

    @GetMapping("/getEducationSet/{username}")
    public Set<Education> getEducationSet(@PathVariable String username) {
        Developer developer = developerRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return developer.getEducations();
    }

    @PostMapping("/addEducation/{username}")
    public int addEducation(@PathVariable String username, @RequestBody Education education) {
        Developer developer = developerRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        education.setDeveloper(developer);
        education = educationRepository.save(education);
        educationRepository.flush();
        return education.getId();
    }

    @PutMapping("/editEducation")
    public void editEducation(@RequestBody Education newEducation) {
        Education education = educationRepository.findById(newEducation.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        education.edit(newEducation);
    }

    @DeleteMapping("/deleteEducation/{id}")
    public void deleteEducation(@PathVariable int id) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        educationRepository.delete(education);
    }
}