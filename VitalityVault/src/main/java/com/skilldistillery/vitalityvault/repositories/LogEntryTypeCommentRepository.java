package com.skilldistillery.vitalityvault.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.vitalityvault.entities.LogEntryTypeComment;

public interface LogEntryTypeCommentRepository extends JpaRepository<LogEntryTypeComment, Integer> {
	

}
