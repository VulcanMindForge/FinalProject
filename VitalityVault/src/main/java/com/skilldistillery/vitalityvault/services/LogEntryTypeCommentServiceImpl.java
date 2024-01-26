package com.skilldistillery.vitalityvault.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.LogEntryTypeComment;
import com.skilldistillery.vitalityvault.repositories.LogEntryTypeCommentRepository;
import com.skilldistillery.vitalityvault.repositories.UserRepository;

@Service
public class LogEntryTypeCommentServiceImpl implements LogEntryTypeCommentService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private LogEntryTypeCommentRepository logEntryTypeCommentRepo;

	@Override
	public List<LogEntryTypeComment> index(String username) {
		return logEntryTypeCommentRepo.findByUser_Username(username);
	}

	@Override
	public LogEntryTypeComment show(String username, int logEntryTypeCommentId) {
		return logEntryTypeCommentRepo.findByUser_UsernameAndId(username, logEntryTypeCommentId);
	}

	@Override
	public LogEntryTypeComment create(String username, LogEntryTypeComment logEntryTypeComment) {
		logEntryTypeComment.setUser(userRepo.findByUsername(username));
		return logEntryTypeCommentRepo.saveAndFlush(logEntryTypeComment);
	}

	@Override
	public LogEntryTypeComment update(String username, int logEntryTypeCommentId,
			LogEntryTypeComment logEntryTypeComment) {
		LogEntryTypeComment existingComment = logEntryTypeCommentRepo.findByUser_UsernameAndId(username, logEntryTypeCommentId);
		
		if (existingComment != null) {
			existingComment.setContent(logEntryTypeComment.getContent());
			existingComment.setContentDate(logEntryTypeComment.getContentDate());
			existingComment.setUser(logEntryTypeComment.getUser());
			existingComment.setLogEntryType(logEntryTypeComment.getLogEntryType());
			
			return logEntryTypeCommentRepo.saveAndFlush(existingComment);
		
		}
		
		return null;
	}

	@Override
	public boolean destroy(String username, int logEntryTypeCommentId) {
		LogEntryTypeComment existingComment = logEntryTypeCommentRepo.findByUser_UsernameAndId(username, logEntryTypeCommentId);
		
		if (existingComment != null) {
			logEntryTypeCommentRepo.delete(existingComment);
			return true;
		}
		return false;
	}


}
