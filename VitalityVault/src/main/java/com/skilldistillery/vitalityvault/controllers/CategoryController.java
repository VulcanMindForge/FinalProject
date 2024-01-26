package com.skilldistillery.vitalityvault.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.vitalityvault.entities.Category;
import com.skilldistillery.vitalityvault.services.CategoryService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class CategoryController {

	@Autowired
	CategoryService catServ;
	
	@GetMapping("categories")
	public List<Category> index(HttpServletRequest req, HttpServletResponse res) {
		return catServ.getAllCategories();
	}

	@GetMapping("categories/{catId}")
	public Category show(HttpServletRequest req, HttpServletResponse res, @PathVariable("catId") int id) {
		Category category = catServ.findByID(id);

		if (category == null) {
			res.setStatus(404);
		}
		return category;
	}
	
}
