package com.skilldistillery.vitalityvault.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
	private TrialComment trialComment;

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
		trialComment = em.find(TrialComment.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		trialComment = null;
	}

	@Test
	void test_LogEntryTypeComment_entity_mapping() {
		assertNotNull(trialComment);
		assertEquals("Was good", trialComment.getContent());
	}

	@Test
	void test_LogEntryTypeComment_User_ManyToOne() {
		assertNotNull(trialComment.getUser());
		assertEquals("admin", trialComment.getUser().getFirstName());
	}

	@Test
	void test_LogEntryTypeComment_logEntryType_ManyToOne() {
		assertNotNull(trialComment.getTrials());
		assertTrue(trialComment.getTrials().size() > 0);
	}

}
