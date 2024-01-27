package com.skilldistillery.vitalityvault.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.Unit;
import com.skilldistillery.vitalityvault.repositories.UnitRepository;

@Service
public class UnitServiceImpl implements UnitService {
	
	@Autowired
	private UnitRepository unitRepo;
	

	@Override
	public List<Unit> index() {
		return unitRepo.findAll();
	}

	@Override
	public Unit show(int unitId) {
		return unitRepo.findById(unitId).get();
	}


}
