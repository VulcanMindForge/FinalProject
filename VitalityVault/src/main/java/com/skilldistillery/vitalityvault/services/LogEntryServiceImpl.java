package com.skilldistillery.vitalityvault.services;

import java.sql.Date;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.LogEntry;
import com.skilldistillery.vitalityvault.repositories.LogEntryRepository;
import com.skilldistillery.vitalityvault.repositories.UserRepository;

@Service
public class LogEntryServiceImpl implements LogEntryService {

	@Autowired
	private LogEntryRepository logEntryRepo;

	@Autowired
	private UserRepository userRepo;

	@Override
	public Set<LogEntry> index(String username) {
		return logEntryRepo.findByUser_Username(username);
	}

	@Override
	public LogEntry show(String username, int logId) {
		return logEntryRepo.findByUser_UsernameAndId(username, logId);
	}

	@Override
	public LogEntry create(String username, LogEntry logEntry) {
		logEntry.setUser(userRepo.findByUsername(username));
		return logEntryRepo.saveAndFlush(logEntry);
	}

	@Override
	public LogEntry update(String username, int logId, LogEntry logEntry) {
		LogEntry newLog = logEntryRepo.findByUser_UsernameAndId(username, logId);

		if (newLog != null) {
			newLog.setEntryDate(logEntry.getEntryDate());
			newLog.setDescription(logEntry.getDescription());
			newLog.setDegree(logEntry.getDegree());
			newLog.setAmount(logEntry.getAmount());
			newLog.setLogEntryType(logEntry.getLogEntryType());
			newLog.setUnit(logEntry.getUnit());

			return logEntryRepo.saveAndFlush(newLog);
		}
		return null;
	}

	@Override
	public boolean destroy(String username, int logId) {
		LogEntry existingLog = logEntryRepo.findByUser_UsernameAndId(username, logId);

		if (existingLog != null) {
			logEntryRepo.delete(existingLog);
			return true;
		}
		return false;
	}

	@Override
	public List<LogEntry> findByUser_UsernameAndEntryDate(String username, Date date) {
		return logEntryRepo.findByUser_UsernameAndEntryDate(username, date);
	}

	

}
