package com.webproject.project_search.Controller;

import com.webproject.project_search.Model.Framework;
import com.webproject.project_search.Model.Language;
import com.webproject.project_search.Model.Speciality;
import com.webproject.project_search.Repository.FrameworkRepository;
import com.webproject.project_search.Repository.LanguageRepository;
import com.webproject.project_search.Repository.SpecialityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class SkillsController {
    @Autowired
    private SpecialityRepository specialityRepository;
    @Autowired
    private LanguageRepository languageRepository;
    @Autowired
    private FrameworkRepository frameworkRepository;

    @GetMapping("/getSkills")
    public HashMap<String, List<?>> getSkills() {
        return new HashMap<>(){{
            put("specialities", specialityRepository.findAll());
            put("languages", languageRepository.findAll());
            put("frameworks", frameworkRepository.findAll());
        }};
    }

    @PostMapping("/addSpeciality")
    public void addSpeciality(@RequestBody Speciality newSpeciality){
        specialityRepository.save(newSpeciality);
    }

    @PostMapping("/addFramework")
    public void addFramework(@RequestBody Framework newFramework){
        frameworkRepository.save(newFramework);
    }

    @PostMapping("/addLanguage")
    public void addLanguage(@RequestBody Language newLanguage){
        languageRepository.save(newLanguage);
    }

}