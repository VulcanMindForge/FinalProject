package com.skilldistillery.vitalityvault.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.vitalityvault.entities.LogEntryType;

public interface LogEntryTypeRepository extends JpaRepository<LogEntryType, Integer> {
	List<LogEntryType> findByCategoryName(String name);

}
