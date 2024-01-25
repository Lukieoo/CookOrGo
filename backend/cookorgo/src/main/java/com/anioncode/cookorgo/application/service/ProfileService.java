package com.anioncode.cookorgo.application.service;

import com.anioncode.cookorgo.application.dao.CategoryHomeRepository;
import com.anioncode.cookorgo.application.dao.CategoryRestaurantRepository;
import com.anioncode.cookorgo.application.dao.ProfileRepository;
import com.anioncode.cookorgo.application.model.Profile;
import com.anioncode.cookorgo.application.model.home.CategoryHome;
import com.anioncode.cookorgo.application.model.restaurant.CategoryRestaurant;
import com.anioncode.cookorgo.common.model.UserInfo;
import com.anioncode.cookorgo.common.repository.UserInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final CategoryHomeRepository categoryHomeRepository;
    private final UserInfoRepository userInfoRepository;
    private final CategoryRestaurantRepository categoryRestaurantRepository;

    public ProfileService(ProfileRepository profileRepository, UserInfoRepository userInfoRepository, CategoryHomeRepository categoryHomeRepository, CategoryRestaurantRepository categoryRestaurantRepository) {
        this.profileRepository = profileRepository;
        this.categoryHomeRepository = categoryHomeRepository;
        this.userInfoRepository = userInfoRepository;
        this.categoryRestaurantRepository = categoryRestaurantRepository;
    }

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Optional<Profile> getProfileById(Long id) {
        return profileRepository.findById(id);
    }

    public Profile updateProfile(Long id, Profile profileDetails) {
        Optional<Profile> Profile = profileRepository.findById(id);
        if (Profile.isPresent()) {
            Profile existingProfile = Profile.get();
            existingProfile.setAddress(profileDetails.getAddress());
            existingProfile.setCategoryHomes(profileDetails.getCategoryHomes());
            return profileRepository.save(existingProfile);
        }
        return null;
    }

    public void deleteAllProfiles() {
        profileRepository.deleteAll();
    }

    public void deleteProfile(Long id) {
        Optional<Profile> optionalProfile = profileRepository.findById(id);
        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();

            // Pobierz użytkowników, którzy posiadają ten profil
            Set<UserInfo> usersWithProfile = userInfoRepository.findByProfiles(profile);

            // Usuń profil z użytkowników
            usersWithProfile.forEach(userInfo -> userInfo.getProfiles().remove(profile));

            // Usuń profil
            profileRepository.deleteById(id);
        }
    }


    public Profile addCategoryToProfile(Long ProfileId, CategoryHome categoryHome) {
        Optional<Profile> optionalProfile = profileRepository.findById(ProfileId);
        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            categoryHomeRepository.save(categoryHome);
            profile.getCategoryHomes().add(categoryHome);
            return profileRepository.save(profile);
        }
        return null;
    }

    public Profile addCategoryRestaurantToProfile(Long ProfileId, CategoryRestaurant categoryRestaurant) {
        Optional<Profile> optionalProfile = profileRepository.findById(ProfileId);
        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            categoryRestaurantRepository.save(categoryRestaurant);
            profile.getCategoryRestaurants().add(categoryRestaurant);
            return profileRepository.save(profile);
        }
        return null;
    }
}