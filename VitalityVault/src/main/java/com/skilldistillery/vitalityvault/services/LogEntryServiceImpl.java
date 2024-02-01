package com.skilldistillery.vitalityvault.services;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.LogEntry;
import com.skilldistillery.vitalityvault.entities.Trial;
import com.skilldistillery.vitalityvault.entities.User;
import com.skilldistillery.vitalityvault.repositories.LogEntryRepository;
import com.skilldistillery.vitalityvault.repositories.TrialRepository;
import com.skilldistillery.vitalityvault.repositories.UserRepository;

@Service
public class LogEntryServiceImpl implements LogEntryService {

	@Autowired
	private LogEntryRepository logEntryRepo;

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private TrialRepository trialRepo;

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
	public List<LogEntry> findByUser_UsernameAndEntryDate(String username, LocalDate date) {
		return logEntryRepo.findByUser_UsernameAndEntryDate(username, date);
	}
	
	@Override
	public List<LogEntry> findTrialLogData(int trialId, List<String> categories) {
		Trial trial = trialRepo.findById(trialId).get();
		User user = userRepo.findById(trial.getUser().getId()).get();
		
		List<String> requiredCategories = Arrays.asList("food", "pain", "sleep", "workout");
	    for (String category : requiredCategories) {
	        if (!categories.contains(category)) {
	            categories.add(category);
	        }
	    }
		
		return logEntryRepo.findByEntryDateBetweenAndLogEntryType_Category_NameInAndUserId(trial.getStartDate(), trial.getEndDate(), categories, user.getId());
	}

}
