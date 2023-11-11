package com.anioncode.cookorgo.controller;

import com.anioncode.cookorgo.model.restaurant.CategoryRestaurant;
import com.anioncode.cookorgo.model.restaurant.RestaurantProduct;
import com.anioncode.cookorgo.service.CategoryRestaurantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/restaurant")
public class CategoryRestaurantController {
    private final CategoryRestaurantService categoryRestaurantService;

    public CategoryRestaurantController(CategoryRestaurantService categoryRestaurantService) {
        this.categoryRestaurantService = categoryRestaurantService;
    }

    @PostMapping("/{categoryRestaurantId}/products")
    public ResponseEntity<CategoryRestaurant> addRestaurantProductToCategoryRestaurant(
            @PathVariable Long categoryRestaurantId,
            @RequestBody RestaurantProduct restaurantProduct
    ) {
        CategoryRestaurant updatedCategoryRestaurant = categoryRestaurantService.addRestaurantProductToCategoryRestaurant(categoryRestaurantId, restaurantProduct);
        if (updatedCategoryRestaurant == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{categoryRestaurantId}/products")
    public ResponseEntity<Set<RestaurantProduct>> getAllRestaurantProductsForCategoryRestaurant(
            @PathVariable Long categoryRestaurantId
    ) {
        Set<RestaurantProduct> restaurantProducts = categoryRestaurantService.getAllRestaurantProductsForCategoryRestaurant(categoryRestaurantId);
        if (restaurantProducts == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(restaurantProducts);
    }

    @GetMapping("/{categoryRestaurantId}/products/{restaurantProductId}")
    public ResponseEntity<RestaurantProduct> getRestaurantProductFromCategoryRestaurant(
            @PathVariable Long categoryRestaurantId,
            @PathVariable Long restaurantProductId
    ) {
        RestaurantProduct restaurantProduct = categoryRestaurantService.getRestaurantProductFromCategoryRestaurant(categoryRestaurantId, restaurantProductId);
        if (restaurantProduct == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(restaurantProduct);
    }

    @DeleteMapping("/{categoryRestaurantId}/products/{restaurantProductId}")
    public ResponseEntity<CategoryRestaurant> deleteRestaurantProductFromCategoryRestaurant(
            @PathVariable Long categoryRestaurantId,
            @PathVariable Long restaurantProductId
    ) {
        CategoryRestaurant updatedCategoryRestaurant = categoryRestaurantService.deleteRestaurantProductFromCategoryRestaurant(categoryRestaurantId, restaurantProductId);
        if (updatedCategoryRestaurant == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedCategoryRestaurant);
    }

    @PutMapping("/{categoryRestaurantId}/products/{restaurantProductId}")
    public ResponseEntity<CategoryRestaurant> updateRestaurantProduct(
            @PathVariable Long categoryRestaurantId,
            @PathVariable Long restaurantProductId,
            @RequestBody RestaurantProduct updatedRestaurantProduct
    ) {
        CategoryRestaurant updatedCategoryRestaurantProduct = categoryRestaurantService.updateRestaurantProductInCategoryRestaurant(categoryRestaurantId, restaurantProductId, updatedRestaurantProduct);
        if (updatedCategoryRestaurantProduct == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(null);
    }
}