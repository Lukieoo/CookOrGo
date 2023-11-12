package com.anioncode.cookorgo.model;

import com.anioncode.cookorgo.model.home.CategoryHome;
import com.anioncode.cookorgo.model.restaurant.CategoryRestaurant;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "addressID")
    private Address address;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<CategoryHome> categoryHomes = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL)
    private Set<CategoryRestaurant> categoryRestaurants = new HashSet<>();

    public void setPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(password);
    }
}