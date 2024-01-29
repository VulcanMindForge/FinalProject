package com.skilldistillery.vitalityvault.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.LogEntryType;
import com.skilldistillery.vitalityvault.repositories.LogEntryTypeRepository;

@Service
public class LogEntryTypeServiceImpl implements LogEntryTypeService {
	
	@Autowired
	private LogEntryTypeRepository logEntryTypeRepo;

	@Override
	public List<LogEntryType> index() {
		return logEntryTypeRepo.findAll(); 
	}

	@Override
	public List<LogEntryType> findByCategoryName(String name) {
		return logEntryTypeRepo.findByCategoryName(name);
	}
	
	@Override
	public LogEntryType show(int logEntryTypeId) {
		return logEntryTypeRepo.findById(logEntryTypeId).get();
	}

	@Override
	public LogEntryType create(LogEntryType logEntryType) {
		return logEntryTypeRepo.save(logEntryType);
	}

	@Override
	public LogEntryType update(int logEntryTypeId, LogEntryType logEntryType) {
		LogEntryType existingLogEntryType = logEntryTypeRepo.findById(logEntryTypeId).get();
		
		if (existingLogEntryType != null) {
			existingLogEntryType.setName(logEntryType.getName());
			existingLogEntryType.setDescription(logEntryType.getDescription());
			existingLogEntryType.setImageUrl(logEntryType.getImageUrl());
			existingLogEntryType.setCategory(logEntryType.getCategory());
			
			return logEntryTypeRepo.saveAndFlush(existingLogEntryType);
		}
			
		return null;
	}

	@Override
	public boolean destroy(int logEntryTypeId) {
		LogEntryType existingLogEntryType = logEntryTypeRepo.findById(logEntryTypeId).get();

		if (existingLogEntryType!= null) {
			logEntryTypeRepo.delete(existingLogEntryType);
			return true;
		}
		return false;
	}


	

}
