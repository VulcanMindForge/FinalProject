package com.skilldistillery.vitalityvault.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.vitalityvault.entities.Unit;

public interface UnitRepository extends JpaRepository<Unit, Integer> {
	

}
