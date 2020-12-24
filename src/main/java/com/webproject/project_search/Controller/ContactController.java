package com.webproject.project_search.Controller;

import com.webproject.project_search.Model.*;
import com.webproject.project_search.Repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
@Transactional
public class ContactController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getContact/{username}")
    public Contact getContact(@PathVariable String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return user.getContact();
    }

    @PutMapping("/editContact/{username}")
    public void editContact(@PathVariable String username, @RequestBody Contact contact) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        user.setContact(contact);
    }
}