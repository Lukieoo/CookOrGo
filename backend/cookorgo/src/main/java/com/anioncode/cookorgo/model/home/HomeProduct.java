package com.anioncode.cookorgo.model.home;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
public class HomeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long homeProductID;

    @Column(columnDefinition = "TEXT")
    private String recipe;

    @Column(columnDefinition = "TEXT")
    private String ingredients;

    private Integer cookingTime;

    @Column(precision = 3, scale = 2)
    private BigDecimal rating;

    private String imageURL;

    @ManyToOne
    @JoinColumn(name = "subCategoryID")
    private SubCategoryHome subCategory;
}
