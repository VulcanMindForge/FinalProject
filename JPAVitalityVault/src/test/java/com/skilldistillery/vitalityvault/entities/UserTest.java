package com.skilldistillery.vitalityvault.entities;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class UserTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private User user;

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
		user=em.find(User.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		user = null;
	}

	@Test
	void test_User_entity_mapping() {
		assertNotNull(user);
		assertEquals("admin", user.getUsername());
	}
	
	@Test
	void test_User_entryLog_OneToMany() {
		assertNotNull(user.getLogEntrys());
		assertTrue(user.getLogEntrys().size() > 0);
	}
	@Test
	void test_User_trial_OneToMany() {
		assertNotNull(user.getTrials());
		assertTrue(user.getTrials().size() > 0);
	}
	@Test
	void test_User_LogEntryTypeComment_OneToMany() {
		assertNotNull(user.getComments());
		assertTrue(user.getComments().size() > 0);
	}

}
