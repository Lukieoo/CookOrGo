package com.anioncode.cookorgo.application.dao;

import com.anioncode.cookorgo.application.model.home.CategoryHome;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryHomeRepository extends JpaRepository<CategoryHome, Long> {
}