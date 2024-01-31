package com.skilldistillery.vitalityvault.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.vitalityvault.entities.LogEntryTypeComment;

public interface LogEntryTypeCommentRepository extends JpaRepository<LogEntryTypeComment, Integer> {
	List<LogEntryTypeComment> findByUser_Username(String username);

	LogEntryTypeComment findByUser_UsernameAndId(String username, int trialId);

}
