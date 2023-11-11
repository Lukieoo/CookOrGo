package com.anioncode.cookorgo.controller;

import com.anioncode.cookorgo.model.home.CategoryHome;
import com.anioncode.cookorgo.model.restaurant.CategoryRestaurant;
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

    //Category Home
    @PostMapping("/{userId}/home")
    public ResponseEntity<User> addCategoryToUser(@PathVariable Long userId, @RequestBody CategoryHome categoryHome) {
        User updatedUser = userService.addCategoryToUser(userId, categoryHome);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/{userId}/home")
    public ResponseEntity<List<CategoryHome>> getAllCategoriesForUser(@PathVariable Long userId) {
        return getListResponseEntity(userId);
    }

    @GetMapping("/{userId}/home/{categoryId}")
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

    @DeleteMapping("/{userId}/home/{categoryId}")
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

    //Restaurant Products
    @PostMapping("/{userId}/restaurant")
    public ResponseEntity<User> addCategoryRestaurantToUser(@PathVariable Long userId, @RequestBody CategoryRestaurant categoryRestaurant) {
        User updatedUser = userService.addCategoryRestaurantToUser(userId, categoryRestaurant);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/{userId}/restaurant")
    public ResponseEntity<List<CategoryHome>> getAllCategoriesRestaurantForUser(@PathVariable Long userId) {
        return getListResponseEntity(userId);
    }

    private ResponseEntity<List<CategoryHome>> getListResponseEntity(@PathVariable Long userId) {
        Optional<User> optionalUser = userService.getUserById(userId);

        if (optionalUser.isPresent()) {
            Set<CategoryHome> userCategories = optionalUser.get().getCategoryHomes();
            return ResponseEntity.ok(userCategories.stream().toList());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}/restaurant/{categoryId}")
    public ResponseEntity<CategoryRestaurant> getCategoryRestaurantFromUser(@PathVariable Long userId, @PathVariable Long categoryId) {
        Optional<User> optionalUser = userService.getUserById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Optional<CategoryRestaurant> optionalCategory = user.getCategoryRestaurants().stream().filter(category -> category.getCategoryRestaurantID().equals(categoryId)).findFirst();

            return optionalCategory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userId}/restaurant/{categoryId}")
    public ResponseEntity<User> deleteCategoryRestaurantFromUser(@PathVariable Long userId, @PathVariable Long categoryId) {
        Optional<User> optionalUser = userService.getUserById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Set<CategoryRestaurant> userCategories = user.getCategoryRestaurants();

            userCategories.removeIf(category -> category.getCategoryRestaurantID().equals(categoryId));
            userService.updateUser(userId, user);

            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
