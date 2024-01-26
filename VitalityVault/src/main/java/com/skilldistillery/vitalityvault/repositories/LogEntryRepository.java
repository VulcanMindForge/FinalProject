package com.skilldistillery.vitalityvault.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.vitalityvault.entities.LogEntry;

public interface LogEntryRepository extends JpaRepository<LogEntry, Integer> {

	Set<LogEntry> findByUser_Username(String username);

	LogEntry findByUser_UsernameAndId(String username, int logId);
}
