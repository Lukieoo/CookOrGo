package com.anioncode.cookorgo.application.model;

import com.anioncode.cookorgo.application.model.home.CategoryHome;
import com.anioncode.cookorgo.application.model.restaurant.CategoryRestaurant;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "profiles")
public class Profile {
    // Constructors, Getters, and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String profileName;

    @Column(nullable = false)
    private LocalDateTime registrationDate;

    public Profile() {
        this.registrationDate = LocalDateTime.now();
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "addressID")
    private Address address;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<CategoryHome> categoryHomes = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL)
    private Set<CategoryRestaurant> categoryRestaurants = new HashSet<>();
}