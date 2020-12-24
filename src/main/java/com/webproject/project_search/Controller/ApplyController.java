//package com.webproject.project_search.Controller;
//
//import com.webproject.project_search.Model.*;
//import com.webproject.project_search.Repository.*;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.server.ResponseStatusException;
//
//import java.util.*;
//
//@RestController
//@CrossOrigin
//@Transactional
//public class ApplyController {
//    @Autowired
//    private DeveloperRepository developerRepository;
//    @Autowired
//    private CompanyRepository companyRepository;
//    @Autowired
//    private ApplyRepository applyRepository;
//
//    @GetMapping("/getApplies/{username}")
//    public Set<Apply> getRequests(@PathVariable String username) {
//        Company company = companyRepository.findByUsername(username)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        return applyRepository.findAllByCompany(company);
//    }
//
//    @PostMapping("/addApply")
//    public int addApply(@RequestParam String developerUsername, @RequestParam String companyUsername) {
//        Developer developer = developerRepository.findByUsername(developerUsername)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        Company company = companyRepository.findByUsername(companyUsername)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        if (!applyRepository.existsByDeveloperAndCompany(developer, company)) {
//            Apply apply = applyRepository.save(new Apply(developer, company));
//            applyRepository.flush();
//            return apply.getId();
//        }
//        return -1;
//    }
//
//    @DeleteMapping("/deleteApply/{id}")
//    public void deleteApply(@PathVariable int id) {
//        applyRepository.findById(id)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        applyRepository.deleteById(id);
//    }
//
//    @PutMapping("acceptApply/{id}")
//    public void acceptApply(@PathVariable int id) {
//        Apply apply = applyRepository.findById(id)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        Developer developer = apply.getDeveloper();
//        Company company = apply.getCompany();
//        company.addDeveloper()
//        applyRepository.deleteById(id);
//    }
//
//    @GetMapping("/isApplied")
//    public int isApplied(@RequestParam String developerUsername, @RequestParam String companyUsername) {
//        Developer developer = developerRepository.findByUsername(developerUsername)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        Company company = companyRepository.findByUsername(companyUsername)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//        Request request = requestRepository.findByDeveloperAndCompany(developer, company)
//                .orElse(null);
//        if (request != null) return request.getId();
//        return -1;
//    }
//}
