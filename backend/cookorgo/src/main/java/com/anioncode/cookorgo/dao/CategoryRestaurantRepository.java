package com.anioncode.cookorgo.dao;

import com.anioncode.cookorgo.model.home.HomeProduct;
import com.anioncode.cookorgo.model.restaurant.CategoryRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRestaurantRepository extends JpaRepository<CategoryRestaurant, Long> {
}