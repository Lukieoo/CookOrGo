package com.anioncode.cookorgo.controller;

import com.anioncode.cookorgo.model.LoginForm;
import com.anioncode.cookorgo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginForm loginForm) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return ResponseEntity.ok(new ApiResponse(true, "User authenticated successfully"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterForm registerForm) {
        // Sprawdź, czy użytkownik o podanej nazwie użytkownika już istnieje
        if (userService.existsByUsername(registerForm.getUsername())) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Username is already taken!"));
        }

        // Sprawdź, czy użytkownik o podanym adresie email już istnieje
        if (userService.existsByEmail(registerForm.getEmail())) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email Address is already in use!"));
        }

        // Utwórz nowego użytkownika
        User user = new User();
        user.setUsername(registerForm.getUsername());
        user.setEmail(registerForm.getEmail());
        user.setPassword(registerForm.getPassword());

        userService.createUser(user);

        return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
    }
}