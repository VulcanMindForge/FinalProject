package com.skilldistillery.vitalityvault.controllers.services;

import com.skilldistillery.vitalityvault.entities.User;

public interface AuthService {
	public User register(User user);
	public User getUserByUsername(String username);
}
