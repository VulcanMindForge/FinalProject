package com.skilldistillery.vitalityvault.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.Category;
import com.skilldistillery.vitalityvault.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository catRepo;
	
	@Override
	public List<Category> getAllCategories() {
		return catRepo.findAll();
	}

	@Override
	public Category findByID(int catId) {
		return catRepo.findById(catId).get();
	}



}
