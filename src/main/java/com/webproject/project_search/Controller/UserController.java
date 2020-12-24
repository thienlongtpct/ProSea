package com.webproject.project_search.Controller;

import com.webproject.project_search.Model.*;
import com.webproject.project_search.Repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@Transactional
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DeveloperRepository developerRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private EmploymentRepository employmentRepository;
    @Autowired
    private EducationRepository educationRepository;
    @Autowired
    private SpecialityRepository specialityRepository;
    @Autowired
    private LanguageRepository languageRepository;
    @Autowired
    private FrameworkRepository frameworkRepository;
    @Autowired
    private ReviewRepository reviewRepository;

    //Profile
    @GetMapping("/getUser/{username}")
    public User getUser(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/addCompany")
    public Company addCompany(@RequestBody Company user) {
        Company company;
        try {
            company = companyRepository.save(user);
            companyRepository.flush();
        }
        catch(Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return company;
    }

    @PostMapping("/addDeveloper")
    public Developer addDeveloper(@RequestBody Developer user) {
        Developer developer;
        try {
            developer = developerRepository.save(user);
            developerRepository.flush();
        }
        catch(Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return developer;
    }

    @PutMapping("/editDeveloper")
    public Developer editDeveloper(@RequestBody Developer newDeveloper) {
        Developer developer = developerRepository.findByUsername(newDeveloper.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        developer.setSpecialities(newDeveloper.getSpecialitySet().stream().map(
                skill -> specialityRepository.findById(skill)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .collect(Collectors.toSet()));
        developer.setLanguages(newDeveloper.getLanguageSet().stream().map(
                skill -> languageRepository.findById(skill)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .collect(Collectors.toSet()));
        developer.setFrameworks(newDeveloper.getFrameworkSet().stream().map(
                skill -> frameworkRepository.findById(skill)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .collect(Collectors.toSet()));
        developer.edit(newDeveloper);
        developer = developerRepository.save(developer);
        developerRepository.flush();
        return developer;
    }

    @PutMapping("/editCompany")
    public Company editCompany(@RequestBody Company newCompany) {
        Company company = companyRepository.findByUsername(newCompany.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        company.edit(newCompany);
        company = companyRepository.save(company);
        developerRepository.flush();
        return company;
    }

    @PostMapping("/loginUser")
    public User loginUser(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) return null;
        user = developerRepository.findByUsername(username).isEmpty() ? (Company)optionalUser.get() : (Developer)optionalUser.get();
        return user.getPassword().equals(password) ? user : null;
    }

    @GetMapping("/searchUser/{username}")
    public List<User> searchUser(@PathVariable String username) {
        List <User> users = new ArrayList<>(userRepository.findUserByUsernameStartingWith(username));
        users.sort(Comparator.comparing(User::getUsername));
        return users.subList(0, Math.min(users.size(), 5));
    }
}