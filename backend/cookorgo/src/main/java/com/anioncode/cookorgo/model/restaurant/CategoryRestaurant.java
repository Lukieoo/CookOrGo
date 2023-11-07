package com.anioncode.cookorgo.model.restaurant;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class CategoryRestaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryRestaurantID;

    @Column(length = 50, nullable = false)
    private String name;
}