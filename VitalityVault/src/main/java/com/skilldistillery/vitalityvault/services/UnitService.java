package com.skilldistillery.vitalityvault.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.Unit;

@Service
public interface UnitService {
	public List<Unit> index();
	public Unit show(int unitID);
}
