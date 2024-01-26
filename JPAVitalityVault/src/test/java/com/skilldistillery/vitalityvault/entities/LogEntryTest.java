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

class LogEntryTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private LogEntry logEntry;

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
		logEntry=em.find(LogEntry.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		logEntry = null;
	}

	@Test
	void test_LogEntry_entity_mapping() {
		assertNotNull(logEntry);
		assertEquals("Brown Sugar", logEntry.getDescription());
	}

}
