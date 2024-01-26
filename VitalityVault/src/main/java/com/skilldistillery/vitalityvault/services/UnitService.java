package com.skilldistillery.vitalityvault.services;

import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.User;

@Service
public interface UnitService {
	public User register(User user);
	public User getUserByUsername(String username);
}