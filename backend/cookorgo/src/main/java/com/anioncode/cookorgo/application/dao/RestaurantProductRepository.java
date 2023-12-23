package com.anioncode.cookorgo.application.dao;

import com.anioncode.cookorgo.application.model.restaurant.RestaurantProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantProductRepository extends JpaRepository<RestaurantProduct, Long> {
}