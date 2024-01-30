package com.skilldistillery.vitalityvault.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.vitalityvault.entities.User;
import com.skilldistillery.vitalityvault.services.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin({ "*", "http://localhost/" })
public class AuthController {
	
	@Autowired
	AuthService authServ;
	
	@PostMapping("register")
	public User register(@RequestBody User user, HttpServletResponse res) {
	  if (user == null) {
	     res.setStatus(400);
	     return null;
	  }
	  user = authServ.register(user);
	  return user;
	}
	 
	@GetMapping("authenticate")
	public User authenticate(Principal principal, HttpServletResponse res) {
	  if (principal == null) { // no Authorization header sent
	     res.setStatus(401);
	     res.setHeader("WWW-Authenticate", "Basic");
	     return null;
	  }
	  return authServ.getUserByUsername(principal.getName());
	}
	
	@PutMapping("user")
	public User update(HttpServletRequest req, HttpServletResponse res,
			@RequestBody User user, Principal principal) {
		try {
			User editedUser = authServ.updateUserProfile(principal.getName(), user);
			if (editedUser == null) {
				res.setStatus(404);
			}
			return editedUser;
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			user = null;
		}
		return user;
	}
}
