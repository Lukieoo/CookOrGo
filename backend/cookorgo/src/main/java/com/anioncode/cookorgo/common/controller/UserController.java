package com.anioncode.cookorgo.common.controller;

import com.anioncode.cookorgo.application.model.Profile;
import com.anioncode.cookorgo.common.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@Tag(name = "User")
@RequestMapping("/user")
@ComponentScan(basePackages = "com.anioncode.cookorgo.common.service")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    @GetMapping("/my-profiles")
    public ResponseEntity<List<Profile>> getMyProfiles(Authentication authentication) {
        if (authentication != null) {
            String username = authentication.getName();
            List<Profile> userProfiles = userService.getProfilesByUsername(username).stream().toList();
            List<Profile> sortedProfiles = userProfiles.stream()
                    .sorted(Comparator.comparing(Profile::getId))
                    .toList();

            return ResponseEntity.ok(sortedProfiles);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    @PostMapping("/add-profile")
    public ResponseEntity<String> addProfile(@RequestBody Profile profile, Authentication authentication) {
        // Pobieranie nazwy użytkownika z kontekstu uwierzytelniania
        String username = authentication.getName();

        // Dodawanie profilu do konkretnego użytkownika
        userService.addProfileToUser(username, profile);

        return ResponseEntity.ok("Profile added successfully");
    }
}
