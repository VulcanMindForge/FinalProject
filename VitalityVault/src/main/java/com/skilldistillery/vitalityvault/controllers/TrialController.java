package com.skilldistillery.vitalityvault.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.vitalityvault.entities.Trial;
import com.skilldistillery.vitalityvault.services.TrialService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class TrialController {

	@Autowired
	TrialService trialServ;
	
	@GetMapping("trials/published")
	List<Trial> indexPublished(HttpServletRequest req, HttpServletResponse res) {
		return trialServ.findPublishedTrials();
	}
	
	@GetMapping("trials")
	List<Trial> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		return trialServ.index(principal.getName());
	}

	@GetMapping("trials/{trialId}")
	public Trial show(HttpServletRequest req, HttpServletResponse res, @PathVariable("trialId") int id,
			Principal principal) {
		Trial trial = trialServ.show(principal.getName(), id);
		if (trial == null) {
			res.setStatus(404);
		}
		return trial;
	}

	@PostMapping("trials")
	public Trial create(HttpServletRequest req, HttpServletResponse res, @RequestBody Trial trial,
			Principal principal) {
		try {
			Trial addedTrial = trialServ.create(principal.getName(), trial);
			res.setStatus(201);
			res.setHeader("Location", req.getRequestURL().append(addedTrial.getId()).toString());
			return addedTrial;
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return trial;
	}

	@PutMapping("trials/{trialId}")
	public Trial update(HttpServletRequest req, HttpServletResponse res, @PathVariable("trialId") int id,
			@RequestBody Trial trial, Principal principal) {
		try {
			Trial editedTrial = trialServ.update(principal.getName(), id, trial);
			if (editedTrial == null) {
				res.setStatus(404);
			}
			return editedTrial;
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			trial = null;
		}
		return trial;
	}

	@DeleteMapping("trials/{trialId}")
	public void destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("trialId") int id,
			Principal principal) {
		try {
			if (trialServ.destroy(principal.getName(), id)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
		}
	}
}
