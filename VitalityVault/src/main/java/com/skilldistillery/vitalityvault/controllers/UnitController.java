package com.skilldistillery.vitalityvault.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.vitalityvault.entities.Unit;
import com.skilldistillery.vitalityvault.services.UnitService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class UnitController {

	@Autowired
	UnitService unitServ;

	@GetMapping("units")
	public List<Unit> index(HttpServletRequest req, HttpServletResponse res) {
		return unitServ.index();
	}

	@GetMapping("units/{unitId}")
	public Unit show(HttpServletRequest req, HttpServletResponse res, @PathVariable("unitId") int id) {
		Unit unit = unitServ.show(id);

		if (unit == null) {
			res.setStatus(404);
		}
		return unit;
	}
	
	
}
