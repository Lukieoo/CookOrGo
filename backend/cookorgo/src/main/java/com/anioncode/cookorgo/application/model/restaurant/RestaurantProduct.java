package com.anioncode.cookorgo.application.model.restaurant;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
public class RestaurantProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long restaurantProductID;

    private String name;

    private String description;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(length = 10, nullable = false)
    private String currency;

    private boolean vegetarian;

    private boolean spicy;

    @Column(precision = 3, scale = 2)
    private BigDecimal rating;

    private String imageURL;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "restaurantID")
    private Restaurant restaurant;
}