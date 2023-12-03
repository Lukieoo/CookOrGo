package com.anioncode.cookorgo.application.model.restaurant;

import com.anioncode.cookorgo.application.model.Address;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long restaurantID;

    @Column(length = 100, nullable = false)
    private String name;

    private String logoURL;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "addressID")
    private Address address;
}