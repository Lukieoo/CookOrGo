package com.anioncode.cookorgo.application.service;

import com.anioncode.cookorgo.application.dao.CategoryHomeRepository;
import com.anioncode.cookorgo.application.dao.CategoryRestaurantRepository;
import com.anioncode.cookorgo.application.dao.ProfileRepository;
import com.anioncode.cookorgo.application.model.Profile;
import com.anioncode.cookorgo.application.model.home.CategoryHome;
import com.anioncode.cookorgo.application.model.restaurant.CategoryRestaurant;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {
    private final ProfileRepository ProfileRepository;
    private final CategoryHomeRepository categoryHomeRepository;
    private final CategoryRestaurantRepository categoryRestaurantRepository;

    public ProfileService(ProfileRepository ProfileRepository, CategoryHomeRepository categoryHomeRepository, CategoryRestaurantRepository categoryRestaurantRepository) {
        this.ProfileRepository = ProfileRepository;
        this.categoryHomeRepository = categoryHomeRepository;
        this.categoryRestaurantRepository = categoryRestaurantRepository;
    }

    public Profile createProfile(Profile profile) {
        return ProfileRepository.save(profile);
    }

    public List<Profile> getAllProfiles() {
        return ProfileRepository.findAll();
    }

    public Optional<Profile> getProfileById(Long id) {
        return ProfileRepository.findById(id);
    }

    public Profile updateProfile(Long id, Profile profileDetails) {
        Optional<Profile> Profile = ProfileRepository.findById(id);
        if (Profile.isPresent()) {
            Profile existingProfile = Profile.get();
            existingProfile.setAddress(profileDetails.getAddress());
            existingProfile.setCategoryHomes(profileDetails.getCategoryHomes());
            return ProfileRepository.save(existingProfile);
        }
        return null;
    }

    public void deleteAllProfiles() {
        ProfileRepository.deleteAll();
    }

    public void deleteProfile(Long id) {
        ProfileRepository.deleteById(id);
    }

    public Profile addCategoryToProfile(Long ProfileId, CategoryHome categoryHome) {
        Optional<Profile> optionalProfile = ProfileRepository.findById(ProfileId);
        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            categoryHomeRepository.save(categoryHome);
            profile.getCategoryHomes().add(categoryHome);
            return ProfileRepository.save(profile);
        }
        return null;
    }

    public Profile addCategoryRestaurantToProfile(Long ProfileId, CategoryRestaurant categoryRestaurant) {
        Optional<Profile> optionalProfile = ProfileRepository.findById(ProfileId);
        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            categoryRestaurantRepository.save(categoryRestaurant);
            profile.getCategoryRestaurants().add(categoryRestaurant);
            return ProfileRepository.save(profile);
        }
        return null;
    }
}