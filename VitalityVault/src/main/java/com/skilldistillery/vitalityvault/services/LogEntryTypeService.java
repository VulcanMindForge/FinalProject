package com.skilldistillery.vitalityvault.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.LogEntryType;

@Service
public interface LogEntryTypeService {
	public List <LogEntryType> index();
	public List <LogEntryType> findByCategoryName(String name);
	public LogEntryType show(int logEntryTypeId);
	public LogEntryType create(LogEntryType logEntryType);
	public LogEntryType update(int logEntryTypeId, LogEntryType logEntryType);
	public boolean destroy(int logEntryTypeId);
}
