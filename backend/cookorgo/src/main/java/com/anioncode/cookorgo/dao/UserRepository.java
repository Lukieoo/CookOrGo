package com.anioncode.cookorgo.dao;
import com.anioncode.cookorgo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}