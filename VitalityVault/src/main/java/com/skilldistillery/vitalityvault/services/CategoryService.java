package com.skilldistillery.vitalityvault.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.Category;

@Service
public interface CategoryService {
	
	List<Category> getAllCategories();
	
	Category findByID(int catId);
}
