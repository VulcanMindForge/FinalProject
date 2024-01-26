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

class CategoryTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Category category;

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
		category=em.find(Category.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		category = null;
	}

	@Test
	void test_Category_entity_mapping() {
		assertNotNull(category);
		assertEquals("Food", category.getName());
	}
	
	@Test
	void test_Category_logEntryType_OneToMany() {
		assertNotNull(category.getLogEntryTypes());
		assertTrue(category.getLogEntryTypes().size() > 0);
	}

}
