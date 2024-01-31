package com.skilldistillery.vitalityvault.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "log_entry_type")
public class LogEntryType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	private String description;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	@OneToMany(mappedBy = "logEntryType")
	@JsonIgnore
	private List<LogEntry> logEntrys;

	public LogEntryType() {
		super();
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
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
			logEntry.setLogEntryType(this);
		}
	}

	public void removeLogEntry(LogEntry logEntry) {
		if (logEntrys != null && logEntrys.contains(logEntry)) {
			logEntrys.remove(logEntry);
			logEntry.setLogEntryType(null);
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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
		LogEntryType other = (LogEntryType) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "LogEntryType [id=" + id + ", name=" + name + ", description=" + description + "]";
	}

}
