package com.anioncode.cookorgo.common.service;

import com.anioncode.cookorgo.application.model.Profile;
import com.anioncode.cookorgo.common.model.UserInfo;
import com.anioncode.cookorgo.common.repository.UserInfoRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {
    private final UserInfoRepository userInfoRepository;

    public UserService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    public Set<Profile> getProfilesByUsername(String username) {
        UserInfo user = userInfoRepository.findByName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getProfiles();
    }

    public void addProfileToUser(String username, Profile profile) {
        UserInfo user = userInfoRepository.findByName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.getProfiles().add(profile);
        userInfoRepository.save(user);
    }
}