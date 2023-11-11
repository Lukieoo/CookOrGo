package com.anioncode.cookorgo.service;

import com.anioncode.cookorgo.dao.CategoryHomeRepository;
import com.anioncode.cookorgo.dao.CategoryRestaurantRepository;
import com.anioncode.cookorgo.dao.UserRepository;
import com.anioncode.cookorgo.model.User;
import com.anioncode.cookorgo.model.home.CategoryHome;
import com.anioncode.cookorgo.model.restaurant.CategoryRestaurant;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final CategoryHomeRepository categoryHomeRepository;
    private final CategoryRestaurantRepository categoryRestaurantRepository;

    public UserService(UserRepository userRepository, CategoryHomeRepository categoryHomeRepository, CategoryRestaurantRepository categoryRestaurantRepository) {
        this.userRepository = userRepository;
        this.categoryHomeRepository = categoryHomeRepository;
        this.categoryRestaurantRepository = categoryRestaurantRepository;
    }

    // Create a new user
    public User createUser(User user) {
        user.setPassword(user.getPassword());
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Update user
    public User updateUser(Long id, User userDetails) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setAddress(userDetails.getAddress());
            existingUser.setUsername(userDetails.getUsername());
            existingUser.setEmail(userDetails.getEmail());
            existingUser.setCategoryHomes(userDetails.getCategoryHomes());
            return userRepository.save(existingUser);
        }
        return null;
    }

    // Delete all users
    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Metoda do dodawania nowej kategorii do użytkownika
    public User addCategoryToUser(Long userId, CategoryHome categoryHome) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Zapisz kategorię do repozytorium
            categoryHomeRepository.save(categoryHome);
            user.getCategoryHomes().add(categoryHome);
            return userRepository.save(user);
        }
        return null;
    }

    public User addCategoryRestaurantToUser(Long userId, CategoryRestaurant categoryRestaurant) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Zapisz kategorię do repozytorium
            categoryRestaurantRepository.save(categoryRestaurant);
            user.getCategoryRestaurants().add(categoryRestaurant);
            return userRepository.save(user);
        }
        return null;
    }
}