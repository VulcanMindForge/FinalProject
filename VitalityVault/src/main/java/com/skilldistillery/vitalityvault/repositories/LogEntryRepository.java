package com.skilldistillery.vitalityvault.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.vitalityvault.entities.LogEntry;

public interface LogEntryRepository extends JpaRepository<LogEntry, Integer> {

	Set<LogEntry> findByUser_Username(String username);

	LogEntry findByUser_UsernameAndId(String username, int logId);
	
	List<LogEntry> findByUser_UsernameAndEntryDate(String username, LocalDate date);
	
	List<LogEntry> findByEntryDateBetweenAndLogEntryType_Category_NameIn(
            LocalDate startDate, LocalDate endDate, List<String> categories);
}
