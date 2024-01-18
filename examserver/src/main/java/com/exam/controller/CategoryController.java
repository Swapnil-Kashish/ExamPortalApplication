package com.exam.controller;


import com.exam.model.examcat.Category;
import com.exam.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    //add Category
    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody Category category){

        return ResponseEntity.ok(this.categoryService.addCategory(category));

    }

    @GetMapping("/{categoryId}")
    public Category getCategory(@PathVariable ("categoryId") Long categoryId){
        return categoryService.getCategory(categoryId);
    }

    @GetMapping("/")

    public List<Category> getAll(){
        return categoryService.getCategories();

    }

    @PutMapping("/")
    public Category updateCategory(@RequestBody Category category){
        return categoryService.updateCategory(category);
    }

    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable("categoryId") Long categoryId){

        categoryService.deleteCategory(categoryId);
    }

}
