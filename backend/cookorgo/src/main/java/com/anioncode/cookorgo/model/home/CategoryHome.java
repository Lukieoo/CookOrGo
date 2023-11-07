package com.anioncode.cookorgo.model.home;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class CategoryHome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryHomeID;

    @Column(length = 50, nullable = false)
    private String name;
}