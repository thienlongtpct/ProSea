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
public class EmploymentController {
    @Autowired
    private DeveloperRepository developerRepository;
    @Autowired
    private EmploymentRepository employmentRepository;

    @GetMapping("/getEmploymentSet/{username}")
    public Set<Employment> getEmploymentSet(@PathVariable String username) {
        Developer developer = developerRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return developer.getEmployments();
    }

    @PostMapping("/addEmployment/{username}")
    public int addEmployment(@PathVariable String username, @RequestBody Employment employment) {
        Developer developer = developerRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        employment.setDeveloper(developer);
        employment = employmentRepository.save(employment);
        employmentRepository.flush();
        return employment.getId();
    }

    @PutMapping("/editEmployment")
    public void editEmployment(@RequestBody Employment newEmployment) {
        Employment employment = employmentRepository.findById(newEmployment.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        employment.edit(newEmployment);
    }

    @DeleteMapping("/deleteEmployment/{id}")
    public void deleteEmployment(@PathVariable int id) {
        Employment employment = employmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        employmentRepository.delete(employment);
    }
}