package com.skilldistillery.vitalityvault.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.vitalityvault.entities.Trial;

public interface TrialRepository extends JpaRepository<Trial, Integer> {
	Set<Trial> findByUser_Username(String username);

	Trial findByUser_UsernameAndId(String username, int trialId);
	
	List<Trial> findByPublishedTrue();

}


