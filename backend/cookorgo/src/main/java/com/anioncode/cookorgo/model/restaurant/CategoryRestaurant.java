package com.anioncode.cookorgo.model.restaurant;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class CategoryRestaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryRestaurantID;

    @Column(length = 50, nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<RestaurantProduct> restaurantProducts = new HashSet<>();
}