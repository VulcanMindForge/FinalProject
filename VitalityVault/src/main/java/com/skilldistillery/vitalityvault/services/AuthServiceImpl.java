package com.skilldistillery.vitalityvault.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.vitalityvault.entities.User;
import com.skilldistillery.vitalityvault.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	PasswordEncoder passEncoder;
	
	@Autowired
	UserRepository userRepo;

	@Override
	public User register(User user) {
		user.setEnabled(true);
		user.setRole("standard");
		user.setPassword(passEncoder.encode(user.getPassword()));
		return userRepo.saveAndFlush(user);
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}

	@Override
	public User updateUserProfile(User user) {
		User existingUser = userRepo.findByUsername(user.getUsername());
		if(existingUser != null) {
			existingUser.setBiography(user.getBiography());;
			existingUser.setBirthdate(user.getBirthdate());
			existingUser.setEmail(user.getEmail());
			existingUser.setFirstName(user.getFirstName());
			existingUser.setLastName(user.getLastName());
			existingUser.setSex(user.getSex());
			existingUser.setImageUrl(user.getImageUrl());

			return userRepo.saveAndFlush(existingUser);
		}
		return null;
	}
}
