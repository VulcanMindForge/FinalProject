package com.skilldistillery.vitalityvault.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.vitalityvault.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	

}
