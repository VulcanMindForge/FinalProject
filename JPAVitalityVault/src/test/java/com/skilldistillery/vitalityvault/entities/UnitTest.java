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

class UnitTest {


	private static EntityManagerFactory emf;
	private EntityManager em;
	private Unit unit;

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
		unit=em.find(Unit.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		unit = null;
	}

	@Test
	void test_Unit_entity_mapping() {
		assertNotNull(unit);
		assertEquals("cup", unit.getName());
	}
	
	@Test
	void test_Unit_LogEntry_OneToMany() {
		assertNotNull(unit.getLogEntrys());
		assertTrue(unit.getLogEntrys().size() > 0);
	}

}
