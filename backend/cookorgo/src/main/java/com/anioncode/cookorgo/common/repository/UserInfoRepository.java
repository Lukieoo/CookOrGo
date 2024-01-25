package com.anioncode.cookorgo.common.repository;

import com.anioncode.cookorgo.application.model.Profile;
import com.anioncode.cookorgo.common.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    Optional<UserInfo> findByName(String username);

    @Query("SELECT u FROM UserInfo u JOIN u.profiles p WHERE p = :profile")
    Set<UserInfo> findByProfiles(@Param("profile") Profile profile);
}