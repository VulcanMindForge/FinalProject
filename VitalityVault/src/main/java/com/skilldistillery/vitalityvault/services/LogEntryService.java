package com.skilldistillery.vitalityvault.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.LogEntry;

@Service
public interface LogEntryService {
	public Set<LogEntry> index(String username);

	public LogEntry show(String username, int logId);

	public LogEntry create(String username, LogEntry logEntry);

	public LogEntry update(String username, int logId, LogEntry logEntry);

	public boolean destroy(String username, int logId);

	public List<LogEntry> findByUser_UsernameAndEntryDate(String username, LocalDate date);

}
