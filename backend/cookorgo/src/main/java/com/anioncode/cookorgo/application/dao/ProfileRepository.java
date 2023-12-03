package com.anioncode.cookorgo.application.dao;
import com.anioncode.cookorgo.application.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}