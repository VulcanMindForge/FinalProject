package com.skilldistillery.vitalityvault.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	@OneToMany(mappedBy = "category")
	@JsonIgnore
	private List<LogEntryType> logEntryTypes;

	public Category() {
		super();
	}

	public List<LogEntryType> getLogEntryTypes() {
		return logEntryTypes;
	}

	public void setLogEntryTypes(List<LogEntryType> logEntryType) {
		this.logEntryTypes = logEntryType;
	}

	public void addLogEntryType(LogEntryType logEntryType) {
		if (logEntryTypes == null) {
			logEntryTypes = new ArrayList<>();
		}

		if (!logEntryTypes.contains(logEntryType)) {
			logEntryTypes.add(logEntryType);
			if (logEntryType.getCategory() != null) {
				logEntryType.getCategory().removeLogEntryType(logEntryType);
			}
			logEntryType.setCategory(this);
		}
	}

	public void removeLogEntryType(LogEntryType logEntryType) {
		if (logEntryTypes != null && logEntryTypes.contains(logEntryType)) {
			logEntryTypes.remove(logEntryType);
			logEntryType.setCategory(null);
		}
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Category other = (Category) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Category [id=" + id + ", name=" + name + "]";
	}
}
