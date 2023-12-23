package com.anioncode.cookorgo.application.controller;

import com.anioncode.cookorgo.application.model.home.CategoryHome;
import com.anioncode.cookorgo.application.model.restaurant.CategoryRestaurant;
import com.anioncode.cookorgo.application.service.ProfileService;
import com.anioncode.cookorgo.application.model.Profile;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@Tag(name = "Profile")
@RequestMapping("/profiles")
public class ProfileController {
    private final ProfileService ProfileService;

    public ProfileController(ProfileService profileService) {
        this.ProfileService = profileService;
    }

    // Create a new Profile
    @PostMapping
    public Profile createProfile(@RequestBody Profile profile) {
        return ProfileService.createProfile(profile);
    }

    // Get all Profiles
    @GetMapping
    public List<Profile> getAllProfiles() {
        return ProfileService.getAllProfiles();
    }

    // Get Profile by ID
    @GetMapping("/{id}")
    public Optional<Profile> getProfileById(@PathVariable Long id) {
        return ProfileService.getProfileById(id);
    }

    // Update Profile by ID
    @PutMapping("/{id}")
    public Profile updateProfile(@PathVariable Long id, @RequestBody Profile profileDetails) {
        return ProfileService.updateProfile(id, profileDetails);
    }

    // Delete all Profiles
    @DeleteMapping
    public String deleteAllProfiles() {
        ProfileService.deleteAllProfiles();
        return "All Profiles have been deleted successfully.";
    }

    // Delete Profile by ID
    @DeleteMapping("/{id}")
    public void deleteProfile(@PathVariable Long id) {
        ProfileService.deleteProfile(id);
    }

    //Category Home
    @PostMapping("/{profileId}/home")
    public ResponseEntity<Profile> addCategoryToProfile(@PathVariable Long profileId, @RequestBody CategoryHome categoryHome) {
        Profile updatedProfile = ProfileService.addCategoryToProfile(profileId, categoryHome);
        if (updatedProfile == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedProfile);
    }

    @GetMapping("/{profileId}/home")
    public ResponseEntity<List<CategoryHome>> getAllCategoriesForProfile(@PathVariable Long profileId) {
        return getListResponseEntity(profileId);
    }

    @GetMapping("/{profileId}/home/{categoryId}")
    public ResponseEntity<CategoryHome> getCategoryFromProfile(@PathVariable Long profileId, @PathVariable Long categoryId) {
        Optional<Profile> optionalProfile = ProfileService.getProfileById(profileId);

        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            Optional<CategoryHome> optionalCategory = profile.getCategoryHomes().stream().filter(category -> category.getCategoryHomeID().equals(categoryId)).findFirst();

            return optionalCategory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{profileId}/home/{categoryId}")
    public ResponseEntity<Profile> deleteCategoryFromProfile(@PathVariable Long profileId, @PathVariable Long categoryId) {
        Optional<Profile> optionalProfile = ProfileService.getProfileById(profileId);

        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            Set<CategoryHome> ProfileCategories = profile.getCategoryHomes();

            ProfileCategories.removeIf(category -> category.getCategoryHomeID().equals(categoryId));
            ProfileService.updateProfile(profileId, profile);

            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Restaurant Products
    @PostMapping("/{profileId}/restaurant")
    public ResponseEntity<Profile> addCategoryRestaurantToProfile(@PathVariable Long profileId, @RequestBody CategoryRestaurant categoryRestaurant) {
        Profile updatedProfile = ProfileService.addCategoryRestaurantToProfile(profileId, categoryRestaurant);
        if (updatedProfile == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedProfile);
    }

    @GetMapping("/{profileId}/restaurant")
    public ResponseEntity<List<CategoryHome>> getAllCategoriesRestaurantForProfile(@PathVariable Long profileId) {
        return getListResponseEntity(profileId);
    }

    private ResponseEntity<List<CategoryHome>> getListResponseEntity(@PathVariable Long profileId) {
        Optional<Profile> optionalProfile = ProfileService.getProfileById(profileId);

        if (optionalProfile.isPresent()) {
            Set<CategoryHome> ProfileCategories = optionalProfile.get().getCategoryHomes();
            return ResponseEntity.ok(ProfileCategories.stream().toList());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{profileId}/restaurant/{categoryId}")
    public ResponseEntity<CategoryRestaurant> getCategoryRestaurantFromProfile(@PathVariable Long profileId, @PathVariable Long categoryId) {
        Optional<Profile> optionalProfile = ProfileService.getProfileById(profileId);

        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            Optional<CategoryRestaurant> optionalCategory = profile.getCategoryRestaurants().stream().filter(category -> category.getCategoryRestaurantID().equals(categoryId)).findFirst();

            return optionalCategory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{profileId}/restaurant/{categoryId}")
    public ResponseEntity<Profile> deleteCategoryRestaurantFromProfile(@PathVariable Long profileId, @PathVariable Long categoryId) {
        Optional<Profile> optionalProfile = ProfileService.getProfileById(profileId);

        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            Set<CategoryRestaurant> ProfileCategories = profile.getCategoryRestaurants();

            ProfileCategories.removeIf(category -> category.getCategoryRestaurantID().equals(categoryId));
            ProfileService.updateProfile(profileId, profile);

            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
