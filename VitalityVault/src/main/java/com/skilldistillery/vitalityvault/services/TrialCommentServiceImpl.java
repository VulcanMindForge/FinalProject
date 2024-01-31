package com.skilldistillery.vitalityvault.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.Trial;
import com.skilldistillery.vitalityvault.entities.TrialComment;
import com.skilldistillery.vitalityvault.repositories.TrialCommentRepository;
import com.skilldistillery.vitalityvault.repositories.TrialRepository;
import com.skilldistillery.vitalityvault.repositories.UserRepository;

@Service
public class TrialCommentServiceImpl implements TrialCommentService {

	@Autowired
	private TrialCommentRepository trialComRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private TrialRepository trialRepo;

	@Override
	public TrialComment create(String username, TrialComment trialComment, int trialId) {
		trialComment.setUser(userRepo.findByUsername(username));
		Trial trial = trialRepo.findById(trialId).get();
		trial.addTrialComment(trialComment);
		return trialComRepo.saveAndFlush(trialComment);
	}
}
