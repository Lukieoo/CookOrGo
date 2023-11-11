package com.anioncode.cookorgo.dao;

import com.anioncode.cookorgo.model.restaurant.RestaurantProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantProductRepository extends JpaRepository<RestaurantProduct, Long> {
}