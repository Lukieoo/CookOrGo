package com.anioncode.cookorgo.application.dao;

import com.anioncode.cookorgo.application.model.home.HomeProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomeProductRepository extends JpaRepository<HomeProduct, Long> {
}