package com.anioncode.cookorgo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    // Constructors, Getters, and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String username;

    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 255, nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDateTime registrationDate;

    public User() {
        this.registrationDate = LocalDateTime.now();
    }

    public void setPassword(String password) {
        //TODO Later add hash
       // BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = password; //passwordEncoder.encode(password);
    }
}