package com.skilldistillery.vitalityvault.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.vitalityvault.services.LogEntryTypeCommentService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class LogEntryTypeCommentController {

	@Autowired
	LogEntryTypeCommentService logEntryTypeCommServ;

}
