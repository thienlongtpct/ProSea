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

import java.awt.desktop.SystemEventListener;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@Transactional
public class ProjectController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DeveloperRepository developerRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private SpecialityRepository specialityRepository;
    @Autowired
    private LanguageRepository languageRepository;
    @Autowired
    private FrameworkRepository frameworkRepository;

    public Map<String, Object> filterProjects(List<Project> projects, String request) throws ParseException {
        JsonObject jsonObject = new Gson().fromJson(request, JsonObject.class);

        String prefix = jsonObject.get("prefix").getAsString();
        int pageNum = jsonObject.get("pageNum").getAsInt();
        boolean hideExpired = jsonObject.get("hideExpired").getAsBoolean();

        String sort = jsonObject.get("sort").getAsString(),
                type = jsonObject.get("type").getAsString();

        int minSalary = jsonObject.getAsJsonObject("salary").get("min").getAsInt(),
                maxSalary = jsonObject.getAsJsonObject("salary").get("max").getAsInt();

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        Date minDeadline = sdf.parse(jsonObject.getAsJsonObject("deadlineRange").get("startDate").getAsString()),
                maxDeadline = sdf.parse(jsonObject.getAsJsonObject("deadlineRange").get("endDate").getAsString());

        Set <Integer> specialitySet = new HashSet<>(),
                languageSet = new HashSet<>(),
                frameworkSet = new HashSet<>();
        jsonObject.get("specialitySet").getAsJsonArray().forEach(jsonElement -> specialitySet.add(jsonElement.getAsInt()));
        jsonObject.get("languageSet").getAsJsonArray().forEach(jsonElement -> languageSet.add(jsonElement.getAsInt()));
        jsonObject.get("frameworkSet").getAsJsonArray().forEach(jsonElement -> frameworkSet.add(jsonElement.getAsInt()));

        projects = projects.stream()
                .filter(project -> project.getName().startsWith(prefix))
                .filter(project -> !hideExpired || project.getDeadline().compareTo(new Date()) >= 0)
                .filter(project -> type.equals("Null") || project.getType().toString().equals(type))
                .filter(project -> project.getDeadline().compareTo(minDeadline) >= 0 && project.getDeadline().compareTo(maxDeadline) <= 0)
                .filter(project -> project.getSalary() >= minSalary && project.getSalary() <= maxSalary)
                .filter(project -> project.getSpecialitySet().containsAll(specialitySet))
                .filter(project -> project.getLanguageSet().containsAll(languageSet))
                .filter(project -> project.getFrameworkSet().containsAll(frameworkSet))
                .collect(Collectors.toList());

        switch (sort) {
            case "DateAsc":
                projects.sort(Comparator.comparing(AuditModel::getCreatedAt));
                break;
            case "DateDesc":
                projects.sort((o1, o2) -> o2.getCreatedAt().compareTo(o1.getCreatedAt()));
                break;
            case "SalaryAsc":
                projects.sort(Comparator.comparingInt(Project::getSalary));
                break;
            case "SalaryDesc":
                projects.sort((o1, o2) -> o2.getSalary()-o1.getSalary());
                break;
            case "DeadlineAsc":
                projects.sort(Comparator.comparing(Project::getDeadline));
                break;
            case "DeadlineDesc":
                projects.sort((o1, o2) -> o2.getDeadline().compareTo(o1.getDeadline()));
                break;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("projects", projects.subList(pageNum*6, Math.min(projects.size(), (pageNum+1)*6)));
        result.put("size", projects.size());

        return result;
    }

    public void updateProject(Project newProject, Project project) {
        newProject.edit(project);
        newProject.setSpecialities(project.getSpecialitySet().stream().map(
                skill -> specialityRepository.findById(skill)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .collect(Collectors.toSet()));
        newProject.setLanguages(project.getLanguageSet().stream().map(
                skill -> languageRepository.findById(skill)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .collect(Collectors.toSet()));
        newProject.setFrameworks(project.getFrameworkSet().stream().map(
                skill -> frameworkRepository.findById(skill)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .collect(Collectors.toSet()));
        newProject.setDevelopers(project.getDeveloperSet().stream().map(
                developer -> developerRepository.findByUsername(developer).orElse(null)).collect(Collectors.toSet()));
        projectRepository.save(newProject);
    }

    @GetMapping("/getProject/{id}")
    public Project getProject(@PathVariable int id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/getProjects")
    public Map<String, Object> getProjects(@RequestParam String request) throws ParseException {
        List<Project> projects = projectRepository.findAll();
        return filterProjects(projects, request);
    }

    @GetMapping("/getUserProjects/{username}")
    public Map<String, Object> getUserProjects(@PathVariable String username, @RequestParam String request) throws Exception {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Set<Project> projects =
                new Gson().fromJson(request, JsonObject.class).get("isBookmark").getAsBoolean() ?
                        ((Developer)user).getBookmarks() : user.getProjects();

        return filterProjects(new ArrayList<>(projects), request);
    }

    @PostMapping("/addProject")
    public void addProject(@RequestBody Project newProject) {
        User user = userRepository.findByUsername(newProject.getUserSet().iterator().next())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Project project = new Project();
        updateProject(project, newProject);
        project = projectRepository.saveAndFlush(project);
        user.addProject(project);
    }

    @PutMapping("/editProject")
    public void editProject(@RequestBody Project newProject) {
        Project project = projectRepository.findById(newProject.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        updateProject(project, newProject);
    }

    @DeleteMapping("/deleteProject/{id}")
    public void isProjectRequested(@PathVariable int id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Set<User> users = project.getUsers();
        for (User user: users) {
            user.removeProject(project);
            userRepository.saveAndFlush(user);
        }
        projectRepository.delete(project);
    }
}
