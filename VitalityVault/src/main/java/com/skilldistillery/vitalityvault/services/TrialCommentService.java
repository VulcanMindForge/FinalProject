package com.skilldistillery.vitalityvault.services;

import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.TrialComment;

@Service
public interface TrialCommentService {
	public TrialComment create(String username, TrialComment trialComment, int trialId);
}
