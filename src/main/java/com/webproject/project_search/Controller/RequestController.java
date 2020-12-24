package com.webproject.project_search.Controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.webproject.project_search.Model.*;
import com.webproject.project_search.Repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@Transactional
public class RequestController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DeveloperRepository developerRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private RequestRepository requestRepository;

    @GetMapping("/getRequests/{username}")
    public Set<Request> getRequests(@PathVariable String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Set <Project> projects = user.getProjects();
        Set <Request> requests = new HashSet<>();
        projects.forEach(project -> requests.addAll(requestRepository.findAllByProject(project)));
        return requests;
    }

    @PostMapping("/addProjectRequest")
    public int addProjectRequest(@RequestParam String username, @RequestParam int id) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!requestRepository.existsByUserAndProject(user, project)) {
            Request request = requestRepository.save(new Request(user, project));
            requestRepository.flush();
            return request.getId();
        }
        return -1;
    }

    @DeleteMapping("/deleteRequest/{id}")
    public void deleteRequest(@PathVariable int id) {
        requestRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        requestRepository.deleteById(id);
    }

    @PutMapping("acceptRequest/{id}")
    public void acceptRequest(@PathVariable int id) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        User user = request.getUser();
        user.addProject(request.getProject());
        requestRepository.deleteById(id);
    }

    @GetMapping("/isProjectRequested")
    public int isProjectRequested(@RequestParam String username, @RequestParam int id) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Request request = requestRepository.findByUserAndProject(user, project)
                .orElse(null);
        if (request != null) return request.getId();
        return -1;
    }
}
