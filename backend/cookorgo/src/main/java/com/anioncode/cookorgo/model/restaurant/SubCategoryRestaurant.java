package com.anioncode.cookorgo.model.restaurant;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class SubCategoryRestaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subCategoryID;

    @Column(length = 50, nullable = false)
    private String name;
}
