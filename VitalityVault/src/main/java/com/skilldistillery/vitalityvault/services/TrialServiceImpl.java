package com.skilldistillery.vitalityvault.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.Trial;
import com.skilldistillery.vitalityvault.repositories.TrialRepository;
import com.skilldistillery.vitalityvault.repositories.UserRepository;

@Service
public class TrialServiceImpl implements TrialService {

	@Autowired
	private TrialRepository trialRepo;

	@Autowired
	private UserRepository userRepo;

	@Override
	public Set<Trial> index(String username) {
		return trialRepo.findByUser_Username(username);
	}

	@Override
	public Trial show(String username, int trialId) {
		return trialRepo.findByUser_UsernameAndId(username, trialId);
	}

	@Override
	public Trial create(String username, Trial trial) {
		trial.setUser(userRepo.findByUsername(username));
		return trialRepo.saveAndFlush(trial);
	}

	@Override
	public Trial update(String username, int trialId, Trial trial) {
		Trial exisitingTrial = trialRepo.findByUser_UsernameAndId(username, trialId);

		if (exisitingTrial != null) {
			exisitingTrial.setPurpose(trial.getPurpose());
			exisitingTrial.setTitle(trial.getTitle());
			exisitingTrial.setLogEntryTypes(trial.getLogEntryTypes());
			exisitingTrial.setPublished(trial.getPublished());
			exisitingTrial.setStartDate(trial.getStartDate());
			exisitingTrial.setEndDate(trial.getEndDate());

			return trialRepo.saveAndFlush(exisitingTrial);
		}
		return null;
	}

	@Override
	public boolean destroy(String username, int trialId) {
		Trial exisitingTrial = trialRepo.findByUser_UsernameAndId(username, trialId);

		if (exisitingTrial != null) {
			trialRepo.delete(exisitingTrial);
			return true;
		}
		return false;
	}

}
