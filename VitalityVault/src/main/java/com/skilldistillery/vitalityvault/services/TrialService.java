package com.skilldistillery.vitalityvault.services;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.Trial;

@Service
public interface TrialService {
	public Set<Trial> index(String username);
	public Trial show(String username, int trialId);
	public Trial create(String username, Trial trial);
	public Trial update(String username, int trialId, Trial trial);
	public boolean destroy(String username, int trialId);
	List<Trial> findPublishedTrials();
}
