package com.skilldistillery.vitalityvault.controllers;

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

import com.skilldistillery.vitalityvault.entities.LogEntryType;
import com.skilldistillery.vitalityvault.services.LogEntryTypeService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class LogEntryTypeController {

	@Autowired
	LogEntryTypeService logEntryTypeServ;

	@GetMapping("entrytypes")
	public List<LogEntryType> index(HttpServletRequest req, HttpServletResponse res) {
		return logEntryTypeServ.index();
	}

	@GetMapping("entrytypes/{typeId}")
	public LogEntryType show(HttpServletRequest req, HttpServletResponse res, @PathVariable("typeId") int id) {
		LogEntryType logType = logEntryTypeServ.show(id);
		if (logType == null) {
			res.setStatus(404);
		}
		return logType;
	}
	@GetMapping("entrytypes/category/{categoryName}")
	public List<LogEntryType> showByCategory(HttpServletRequest req, HttpServletResponse res, @PathVariable("categoryName") String name) {
		List<LogEntryType> logType = logEntryTypeServ.findByCategoryName(name);
		if (logType == null) {
			res.setStatus(404);
		}
		return logType;
	}

	@PostMapping("entrytypes")
	public LogEntryType create(HttpServletRequest req, HttpServletResponse res, @RequestBody LogEntryType entryType) {
		try {
			LogEntryType addedEntryType = logEntryTypeServ.create(entryType);
			res.setStatus(201);
			res.setHeader("Location", req.getRequestURL().append(addedEntryType.getId()).toString());
			return addedEntryType;
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return entryType;
	}

	@PutMapping("entrytypes/{typeId}")
	public LogEntryType update(HttpServletRequest req, HttpServletResponse res, @PathVariable("typeId") int id,
			@RequestBody LogEntryType entryType) {
		try {
			LogEntryType editedLogEntryType = logEntryTypeServ.update(id, entryType);
			if (editedLogEntryType == null) {
				res.setStatus(404);
			}
			return editedLogEntryType;
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			entryType = null;
		}
		return entryType;
	}

	@DeleteMapping("entrytypes/{typeId}")
	public void destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable("typeId") int id) {
		try {
			if (logEntryTypeServ.destroy(id)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
		}
	}

}
