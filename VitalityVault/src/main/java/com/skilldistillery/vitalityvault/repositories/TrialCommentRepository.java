package com.skilldistillery.vitalityvault.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.vitalityvault.entities.TrialComment;

public interface TrialCommentRepository extends JpaRepository<TrialComment, Integer> {

}
