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

class LogEntryTypeTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private LogEntryType logEntryType;

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
		logEntryType=em.find(LogEntryType.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		logEntryType = null;
	}

	@Test
	void test_LogEntryType_entity_mapping() {
		assertNotNull(logEntryType);
		assertEquals("Oatmeal", logEntryType.getName());
	}

}
