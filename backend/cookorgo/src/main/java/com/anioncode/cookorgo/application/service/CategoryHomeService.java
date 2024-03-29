package com.anioncode.cookorgo.application.service;

import com.anioncode.cookorgo.application.dao.CategoryHomeRepository;
import com.anioncode.cookorgo.application.dao.HomeProductRepository;
import com.anioncode.cookorgo.application.model.home.CategoryHome;
import com.anioncode.cookorgo.application.model.home.HomeProduct;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class CategoryHomeService {
    private final CategoryHomeRepository categoryHomeRepository;
    private final HomeProductRepository homeProductRepository;

    public CategoryHomeService(CategoryHomeRepository categoryHomeRepository, HomeProductRepository homeProductRepository) {
        this.categoryHomeRepository = categoryHomeRepository;
        this.homeProductRepository = homeProductRepository;
    }

    public CategoryHome addHomeProductToCategoryHome(Long categoryHomeId, HomeProduct homeProduct) {
        Optional<CategoryHome> optionalCategoryHome = categoryHomeRepository.findById(categoryHomeId);

        if (optionalCategoryHome.isPresent()) {
            CategoryHome categoryHome = optionalCategoryHome.get();
            categoryHome.getHomeProducts().add(homeProduct);
            return categoryHomeRepository.save(categoryHome);
        } else {
            return null;
        }
    }


    public Set<HomeProduct> getAllHomeProductsForCategoryHome(Long categoryHomeId) {
        Optional<CategoryHome> optionalCategoryHome = categoryHomeRepository.findById(categoryHomeId);

        return optionalCategoryHome.map(CategoryHome::getHomeProducts).orElse(null);
    }

    public CategoryHome deleteHomeProductFromCategoryHome(Long categoryHomeId, Long homeProductId) {
        Optional<CategoryHome> optionalCategoryHome = categoryHomeRepository.findById(categoryHomeId);

        if (optionalCategoryHome.isPresent()) {
            CategoryHome categoryHome = optionalCategoryHome.get();
            categoryHome.getHomeProducts().removeIf(homeProduct -> homeProduct.getHomeProductID().equals(homeProductId));
            return categoryHomeRepository.save(categoryHome);
        } else {
            return null;
        }
    }

    public HomeProduct getHomeProductFromCategoryHome(Long categoryHomeId, Long homeProductId) {
        Optional<CategoryHome> optionalCategoryHome = categoryHomeRepository.findById(categoryHomeId);

        if (optionalCategoryHome.isPresent()) {
            CategoryHome categoryHome = optionalCategoryHome.get();
            return categoryHome.getHomeProducts().stream()
                    .filter(homeProduct -> homeProduct.getHomeProductID().equals(homeProductId))
                    .findFirst()
                    .orElse(null);
        } else {
            return null;
        }
    }

    public CategoryHome updateHomeProductInCategoryHome(Long categoryHomeId, Long homeProductId, HomeProduct updatedHomeProduct) {
        Optional<CategoryHome> optionalCategoryHome = categoryHomeRepository.findById(categoryHomeId);

        if (optionalCategoryHome.isPresent()) {
            CategoryHome categoryHome = optionalCategoryHome.get();
            Set<HomeProduct> homeProducts = categoryHome.getHomeProducts();

            homeProducts.stream()
                    .filter(homeProduct -> homeProduct.getHomeProductID().equals(homeProductId))
                    .findFirst()
                    .ifPresent(existingHomeProduct -> {
                        existingHomeProduct.setRecipe(updatedHomeProduct.getRecipe());
                        existingHomeProduct.setIngredients(updatedHomeProduct.getIngredients());
                        existingHomeProduct.setCookingTime(updatedHomeProduct.getCookingTime());
                        existingHomeProduct.setRating(updatedHomeProduct.getRating());
                        existingHomeProduct.setImageURL(updatedHomeProduct.getImageURL());
                        homeProductRepository.save(existingHomeProduct);
                    });

            return categoryHomeRepository.save(categoryHome);
        } else {
            return null;
        }
    }
}
