package com.skilldistillery.vitalityvault.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.LogEntryTypeComment;

@Service
public interface LogEntryTypeCommentService {
	public List<LogEntryTypeComment> index(String username);
	public LogEntryTypeComment show(String username, int logEntryTypeCommentId);
	public LogEntryTypeComment create(String username, LogEntryTypeComment logEntryTypeComment);
	public LogEntryTypeComment update(String username, int logEntryTypeCommentId, LogEntryTypeComment logEntryTypeComment);
	public boolean destroy(String username, int logEntryTypeCommentId);
}
