package com.anioncode.cookorgo.application.dao;

import com.anioncode.cookorgo.application.model.restaurant.CategoryRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRestaurantRepository extends JpaRepository<CategoryRestaurant, Long> {
}