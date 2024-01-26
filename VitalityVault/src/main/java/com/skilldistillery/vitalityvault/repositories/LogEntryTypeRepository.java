package com.skilldistillery.vitalityvault.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.vitalityvault.entities.LogEntryType;

public interface LogEntryTypeRepository extends JpaRepository<LogEntryType, Integer> {
	

}
