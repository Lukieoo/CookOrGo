package com.anioncode.cookorgo.controller;

import com.anioncode.cookorgo.model.home.CategoryHome;
import com.anioncode.cookorgo.service.UserService;
import com.anioncode.cookorgo.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create a new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Update user by ID
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userService.updateUser(id, userDetails);
    }

    // Delete all users
    @DeleteMapping
    public String deleteAllUsers() {
        userService.deleteAllUsers();
        return "All users have been deleted successfully.";
    }

    // Delete user by ID
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/{userId}/categories")
    public ResponseEntity<User> addCategoryToUser(@PathVariable Long userId, @RequestBody CategoryHome categoryHome) {
        User updatedUser = userService.addCategoryToUser(userId, categoryHome);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/{userId}/categories")
    public ResponseEntity<List<CategoryHome>> getAllCategoriesForUser(@PathVariable Long userId) {
        Optional<User> optionalUser = userService.getUserById(userId);

        if (optionalUser.isPresent()) {
            Set<CategoryHome> userCategories = optionalUser.get().getCategoryHomes();
            return ResponseEntity.ok(userCategories.stream().toList());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}/categories/{categoryId}")
    public ResponseEntity<CategoryHome> getCategoryFromUser(@PathVariable Long userId, @PathVariable Long categoryId) {
        Optional<User> optionalUser = userService.getUserById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Optional<CategoryHome> optionalCategory = user.getCategoryHomes().stream().filter(category -> category.getCategoryHomeID().equals(categoryId)).findFirst();

            return optionalCategory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userId}/categories/{categoryId}")
    public ResponseEntity<User> deleteCategoryFromUser(@PathVariable Long userId, @PathVariable Long categoryId) {
        Optional<User> optionalUser = userService.getUserById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Set<CategoryHome> userCategories = user.getCategoryHomes();

            userCategories.removeIf(category -> category.getCategoryHomeID().equals(categoryId));
            userService.updateUser(userId, user);

            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
