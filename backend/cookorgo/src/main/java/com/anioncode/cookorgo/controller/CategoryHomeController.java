package com.anioncode.cookorgo.controller;

import com.anioncode.cookorgo.model.home.CategoryHome;
import com.anioncode.cookorgo.model.home.HomeProduct;
import com.anioncode.cookorgo.service.CategoryHomeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/categoryhomes")
public class CategoryHomeController {
    private final CategoryHomeService categoryHomeService;

    public CategoryHomeController(CategoryHomeService categoryHomeService) {
        this.categoryHomeService = categoryHomeService;
    }

    @PostMapping("/{categoryHomeId}/homeproducts")
    public ResponseEntity<CategoryHome> addHomeProductToCategoryHome(
            @PathVariable Long categoryHomeId,
            @RequestBody HomeProduct homeProduct
    ) {
        CategoryHome updatedCategoryHome = categoryHomeService.addHomeProductToCategoryHome(categoryHomeId, homeProduct);
        if (updatedCategoryHome == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{categoryHomeId}/homeproducts")
    public ResponseEntity<Set<HomeProduct>> getAllHomeProductsForCategoryHome(
            @PathVariable Long categoryHomeId
    ) {
        Set<HomeProduct> homeProducts = categoryHomeService.getAllHomeProductsForCategoryHome(categoryHomeId);
        if (homeProducts == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(homeProducts);
    }

    @GetMapping("/{categoryHomeId}/homeproducts/{homeProductId}")
    public ResponseEntity<HomeProduct> getHomeProductFromCategoryHome(
            @PathVariable Long categoryHomeId,
            @PathVariable Long homeProductId
    ) {
        HomeProduct homeProduct = categoryHomeService.getHomeProductFromCategoryHome(categoryHomeId, homeProductId);
        if (homeProduct == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(homeProduct);
    }

    @DeleteMapping("/{categoryHomeId}/homeproducts/{homeProductId}")
    public ResponseEntity<CategoryHome> deleteHomeProductFromCategoryHome(
            @PathVariable Long categoryHomeId,
            @PathVariable Long homeProductId
    ) {
        CategoryHome updatedCategoryHome = categoryHomeService.deleteHomeProductFromCategoryHome(categoryHomeId, homeProductId);
        if (updatedCategoryHome == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedCategoryHome);
    }

    @PutMapping("/{categoryHomeId}/homeproducts/{homeProductId}")
    public ResponseEntity<CategoryHome> updateHomeProduct(
            @PathVariable Long categoryHomeId,
            @PathVariable Long homeProductId,
            @RequestBody HomeProduct updatedHomeProduct
    ) {
        CategoryHome updatedCategoryHomeProduct = categoryHomeService.updateHomeProductInCategoryHome(categoryHomeId, homeProductId, updatedHomeProduct);
        if (updatedCategoryHomeProduct == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(null);
    }
}