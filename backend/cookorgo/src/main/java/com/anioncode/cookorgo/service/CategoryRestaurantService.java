package com.anioncode.cookorgo.service;

import com.anioncode.cookorgo.dao.CategoryRestaurantRepository;
import com.anioncode.cookorgo.dao.RestaurantProductRepository;
import com.anioncode.cookorgo.model.restaurant.CategoryRestaurant;
import com.anioncode.cookorgo.model.restaurant.RestaurantProduct;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoryRestaurantService {
    private final CategoryRestaurantRepository categoryRestaurantRepository;
    private final RestaurantProductRepository restaurantProductRepository;

    public CategoryRestaurantService(CategoryRestaurantRepository categoryRestaurantRepository, RestaurantProductRepository restaurantProductRepository) {
        this.categoryRestaurantRepository = categoryRestaurantRepository;
        this.restaurantProductRepository = restaurantProductRepository;
    }

    public CategoryRestaurant addRestaurantProductToCategoryRestaurant(Long categoryRestaurantId, RestaurantProduct restaurantProduct) {
        Optional<CategoryRestaurant> optionalCategoryRestaurant = categoryRestaurantRepository.findById(categoryRestaurantId);

        if (optionalCategoryRestaurant.isPresent()) {
            CategoryRestaurant categoryRestaurant = optionalCategoryRestaurant.get();
            categoryRestaurant.getRestaurantProducts().add(restaurantProduct);
            return categoryRestaurantRepository.save(categoryRestaurant);
        } else {
            return null;
        }
    }

    public Set<RestaurantProduct> getAllRestaurantProductsForCategoryRestaurant(Long categoryRestaurantId) {
        Optional<CategoryRestaurant> optionalCategoryRestaurant = categoryRestaurantRepository.findById(categoryRestaurantId);

        return optionalCategoryRestaurant.map(CategoryRestaurant::getRestaurantProducts).orElse(null);
    }

    public CategoryRestaurant deleteRestaurantProductFromCategoryRestaurant(Long categoryRestaurantId, Long restaurantProductId) {
        Optional<CategoryRestaurant> optionalCategoryRestaurant = categoryRestaurantRepository.findById(categoryRestaurantId);

        if (optionalCategoryRestaurant.isPresent()) {
            CategoryRestaurant categoryRestaurant = optionalCategoryRestaurant.get();
            categoryRestaurant.getRestaurantProducts().removeIf(restaurantProduct -> restaurantProduct.getRestaurantProductID().equals(restaurantProductId));
            return categoryRestaurantRepository.save(categoryRestaurant);
        } else {
            return null;
        }
    }

    public RestaurantProduct getRestaurantProductFromCategoryRestaurant(Long categoryRestaurantId, Long restaurantProductId) {
        Optional<CategoryRestaurant> optionalCategoryRestaurant = categoryRestaurantRepository.findById(categoryRestaurantId);

        if (optionalCategoryRestaurant.isPresent()) {
            CategoryRestaurant categoryRestaurant = optionalCategoryRestaurant.get();
            return categoryRestaurant.getRestaurantProducts().stream()
                    .filter(restaurantProduct -> restaurantProduct.getRestaurantProductID().equals(restaurantProductId))
                    .findFirst()
                    .orElse(null);
        } else {
            return null;
        }
    }

    public CategoryRestaurant updateRestaurantProductInCategoryRestaurant(Long categoryRestaurantId, Long restaurantProductId, RestaurantProduct updatedRestaurantProduct) {
        Optional<CategoryRestaurant> optionalCategoryRestaurant = categoryRestaurantRepository.findById(categoryRestaurantId);

        if (optionalCategoryRestaurant.isPresent()) {
            CategoryRestaurant categoryRestaurant = optionalCategoryRestaurant.get();
            Set<RestaurantProduct> restaurantProducts = categoryRestaurant.getRestaurantProducts();

            restaurantProducts.stream()
                    .filter(restaurantProduct -> restaurantProduct.getRestaurantProductID().equals(restaurantProductId))
                    .findFirst()
                    .ifPresent(existingRestaurantProduct -> {
                        existingRestaurantProduct.setDescription(updatedRestaurantProduct.getDescription());
                        existingRestaurantProduct.setPrice(updatedRestaurantProduct.getPrice());
                        existingRestaurantProduct.setCurrency(updatedRestaurantProduct.getCurrency());
                        existingRestaurantProduct.setVegetarian(updatedRestaurantProduct.isVegetarian());
                        existingRestaurantProduct.setSpicy(updatedRestaurantProduct.isSpicy());
                        existingRestaurantProduct.setRating(updatedRestaurantProduct.getRating());
                        existingRestaurantProduct.setImageURL(updatedRestaurantProduct.getImageURL());

                        // Dodanie aktualizacji dla pola restaurant
                        existingRestaurantProduct.setRestaurant(updatedRestaurantProduct.getRestaurant());

                        restaurantProductRepository.save(existingRestaurantProduct);
                    });

            return categoryRestaurantRepository.save(categoryRestaurant);
        } else {
            return null;
        }
    }
}