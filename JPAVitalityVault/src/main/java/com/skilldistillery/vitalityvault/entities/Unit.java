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
public class Unit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	@OneToMany(mappedBy = "unit")
	@JsonIgnore
	private List<LogEntry> logEntrys;

	public Unit() {
		super();
	}

	public List<LogEntry> getLogEntrys() {
		return logEntrys;
	}

	public void setLogEntrys(List<LogEntry> logEntrys) {
		this.logEntrys = logEntrys;
	}

	public void addLogEntry(LogEntry logEntry) {
		if (logEntrys == null) {
			logEntrys = new ArrayList<>();
		}

		if (!logEntrys.contains(logEntry)) {
			logEntrys.add(logEntry);
			if (logEntry.getLogEntryType() != null) {
				logEntry.getLogEntryType().removeLogEntry(logEntry);
			}
			logEntry.setUnit(this);
		}
	}

	public void removeLogEntry(LogEntry logEntry) {
		if (logEntrys != null && logEntrys.contains(logEntry)) {
			logEntrys.remove(logEntry);
			logEntry.setUnit(null);
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
		Unit other = (Unit) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Unit [id=" + id + ", name=" + name + "]";
	}
}
