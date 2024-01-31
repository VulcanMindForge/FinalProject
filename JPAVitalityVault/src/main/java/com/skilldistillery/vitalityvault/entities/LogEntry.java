package com.skilldistillery.vitalityvault.entities;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "log_entry")
public class LogEntry {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@CreationTimestamp
	@Column(name = "create_date")
	private LocalDateTime createDate;

	@UpdateTimestamp
	@Column(name = "last_update")
	private LocalDateTime lastUpdate;

	@Column(name = "entry_date")
	private LocalDate entryDate;

	private String description;

	private Integer degree;

	private String amount;

	@Column(name = "entry_time")
	private Time entryTime;

	@ManyToOne
	@JoinColumn(name = "log_entry_type_id")
	private LogEntryType logEntryType;

	@ManyToOne
	@JoinColumn(name = "unit_id")
	private Unit unit;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	public LogEntry() {
		super();
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Unit getUnit() {
		return unit;
	}

	public void setUnit(Unit unit) {
		this.unit = unit;
	}

	public LogEntryType getLogEntryType() {
		return logEntryType;
	}

	public void setLogEntryType(LogEntryType logEntryType) {
		this.logEntryType = logEntryType;
	}

	public void setDegree(Integer degree) {
		this.degree = degree;
	}

	public Integer getDegree() {
		return degree;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}

	public LocalDateTime getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(LocalDateTime lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public LocalDate getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(LocalDate entryDate) {
		this.entryDate = entryDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public Time getEntryTime() {
		return entryTime;
	}

	public void setEntryTime(Time entryTime) {
		this.entryTime = entryTime;
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
		LogEntry other = (LogEntry) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "LogEntry [id=" + id + ", createDate=" + createDate + ", lastUpdate=" + lastUpdate + ", entryDate="
				+ entryDate + ", description=" + description + ", degree=" + degree + ", amount=" + amount
				+ ", entryTime=" + entryTime + "]";
	}

}
