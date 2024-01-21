package com.anioncode.cookorgo.common.controller;

import com.anioncode.cookorgo.application.model.Profile;
import com.anioncode.cookorgo.common.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@Tag(name = "User")
@RequestMapping("/user")
@ComponentScan(basePackages = "com.anioncode.cookorgo.common.service")
public class UserController {

    @Autowired
    private UserService userService;
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/my-profiles")
    public ResponseEntity<Set<Profile>> getMyProfiles(Authentication authentication) {
        // Pobieranie nazwy użytkownika z kontekstu uwierzytelniania
        String username = authentication.getName();

        // Pobieranie profili dla konkretnego użytkownika
        Set<Profile> userProfiles = userService.getProfilesByUsername(username);

        return ResponseEntity.ok(userProfiles);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/add-profile")
    public ResponseEntity<String> addProfile(@RequestBody Profile profile, Authentication authentication) {
        // Pobieranie nazwy użytkownika z kontekstu uwierzytelniania
        String username = authentication.getName();

        // Dodawanie profilu do konkretnego użytkownika
        userService.addProfileToUser(username, profile);

        return ResponseEntity.ok("Profile added successfully");
    }
}
