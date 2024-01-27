package com.skilldistillery.vitalityvault.services;

import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.User;

@Service
public interface AuthService {
	public User register(User user);
	public User getUserByUsername(String username);
	public User updateUserProfile(String username, User user);
}
