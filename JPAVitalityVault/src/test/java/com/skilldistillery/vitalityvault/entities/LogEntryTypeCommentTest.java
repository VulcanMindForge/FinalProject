package com.skilldistillery.vitalityvault.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class LogEntryTypeCommentTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private LogEntryTypeComment logEntryTypeComment;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAVitalityVault");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		logEntryTypeComment=em.find(LogEntryTypeComment.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		logEntryTypeComment = null;
	}

	@Test
	void test_LogEntryTypeComment_entity_mapping() {
		assertNotNull(logEntryTypeComment);
		assertEquals("Was good", logEntryTypeComment.getContent());
	}
	@Test
	void test_LogEntryTypeComment_User_ManyToOne() {
		assertNotNull(logEntryTypeComment.getUser());
		assertEquals("admin", logEntryTypeComment.getUser().getFirstName());
	}
	@Test
	void test_LogEntryTypeComment_logEntryType_ManyToOne() {
		assertNotNull(logEntryTypeComment.getLogEntryType());
		assertEquals("Oatmeal", logEntryTypeComment.getLogEntryType().getName());
	}

}
