package com.anioncode.cookorgo.dao;

import com.anioncode.cookorgo.model.home.HomeProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomeProductRepository extends JpaRepository<HomeProduct, Long> {
}