package com.skilldistillery.vitalityvault.controllers.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.skilldistillery.vitalityvault.entities.User;
import com.skilldistillery.vitalityvault.repositories.UserRepository;

public class AuthServiceImpl implements AuthService {
	
	@Autowired
	PasswordEncoder passEncoder;
	
	@Autowired
	UserRepository userRepo;

	@Override
	public User register(User user) {

		return user;
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}
}
