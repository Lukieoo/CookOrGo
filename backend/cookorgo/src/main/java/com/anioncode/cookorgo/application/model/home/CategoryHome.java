package com.anioncode.cookorgo.application.model.home;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class CategoryHome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryHomeID;

    @Column(length = 50, nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<HomeProduct> homeProducts = new HashSet<>();
}