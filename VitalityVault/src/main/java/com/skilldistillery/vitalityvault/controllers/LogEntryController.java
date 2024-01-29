package com.skilldistillery.vitalityvault.controllers;

import java.security.Principal;
import java.sql.Date;
import java.util.List;
import java.util.Set;

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

import com.skilldistillery.vitalityvault.entities.LogEntry;
import com.skilldistillery.vitalityvault.services.LogEntryService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class LogEntryController {

	@Autowired
	LogEntryService logEntryServ;
	
	@GetMapping("logs")
	Set<LogEntry> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		return logEntryServ.index(principal.getName());
	}

	@GetMapping("logs/{logId}")
	public LogEntry show(HttpServletRequest req, HttpServletResponse res, @PathVariable("logId") int id,
			Principal principal) {
		LogEntry log = logEntryServ.show(principal.getName(), id);
		if (log == null) {
			res.setStatus(404);
		}
		return log;
	}

	@PostMapping("logs")
	public LogEntry create(HttpServletRequest req, HttpServletResponse res, @RequestBody LogEntry log,
			Principal principal) {
		try {
			LogEntry addedLog = logEntryServ.create(principal.getName(), log);
			res.setStatus(201);
			res.setHeader("Location", req.getRequestURL().append(addedLog.getId()).toString());
			return addedLog;
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return log;
	}

	@PutMapping("logs/{tid}")
	public LogEntry update(HttpServletRequest req, HttpServletResponse res, @PathVariable("tid") int tid,
			@RequestBody LogEntry log, Principal principal) {
		try {
			LogEntry editedLog = logEntryServ.update(principal.getName(), tid, log);
			if (editedLog == null) {
				res.setStatus(404);
			}
			return editedLog;
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			log = null;
		}
		return log;
	}

	@DeleteMapping("logs/{logId}")
	public void destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("logId") int id,
			Principal principal) {
		try {
			if (logEntryServ.destroy(principal.getName(), id)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
		}
	}
	
	@GetMapping("logs/date/{date}")
	public List<LogEntry> showByEntryDate(HttpServletRequest req, HttpServletResponse res, @PathVariable("date") Date date,
			Principal principal) {
		List<LogEntry> log = logEntryServ.findByUser_UsernameAndEntryDate(principal.getName(), date);
		if (log == null) {
			res.setStatus(404);
		}
		return log;
	}
}
