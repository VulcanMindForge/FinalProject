package com.skilldistillery.vitalityvault.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.vitalityvault.entities.TrialComment;

public interface TrialCommentRepository extends JpaRepository<TrialComment, Integer> {
	List<TrialComment> findByUser_Username(String username);

	TrialComment findByUser_UsernameAndId(String username, int trialId);

}
