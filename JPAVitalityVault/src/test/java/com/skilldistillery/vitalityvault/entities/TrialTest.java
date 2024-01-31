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

class TrialTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Trial trial;

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
		trial = em.find(Trial.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		trial = null;
	}

	@Test
	void test_Trial_entity_mapping() {
		assertNotNull(trial);
		assertEquals("TEST", trial.getTitle());
	}

	@Test
	void test_Trial_User_ManyToOne() {
		assertNotNull(trial.getUser());
		assertEquals("admin", trial.getUser().getFirstName());
	}

	@Test
	void test_Trial_LogEntryType_ManyToMany() {
		assertNotNull(trial.getTrialComments());
		assertTrue(trial.getTrialComments().size() > 0);
	}

}
