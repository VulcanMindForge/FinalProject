package com.skilldistillery.vitalityvault.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Trial {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name="create_date")
	private LocalDateTime createDate;
	private String purpose;
	@Column(name="last_update")
	private LocalDateTime lastUpdate;
	@Column(name="start_date")
	private LocalDateTime startDate;
	@Column(name="end_date")
	private LocalDateTime endDate;
	private String title;
	private Boolean published;
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@ManyToMany
	@JoinTable(name = "trial_has_log_entry_type", joinColumns = @JoinColumn(name = "trial_id"), inverseJoinColumns = @JoinColumn(name = "log_entry_type_id"))
	private List<LogEntryType> logEntryTypes;
	
	public Trial() {
		super();
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
	public String getPurpose() {
		return purpose;
	}
	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}
	public LocalDateTime getLastUpdate() {
		return lastUpdate;
	}
	public void setLastUpdate(LocalDateTime lastUpdate) {
		this.lastUpdate = lastUpdate;
	}
	public LocalDateTime getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}
	public LocalDateTime getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Boolean getPublished() {
		return published;
	}
	public void setPublished(Boolean published) {
		this.published = published;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<LogEntryType> getLogEntryTypes() {
		return logEntryTypes;
	}
	public void setLogEntryTypes(List<LogEntryType> logEntryTypes) {
		this.logEntryTypes = logEntryTypes;
	}
	
	public void addLogEntryType(LogEntryType logEntryType) {
		if (logEntryTypes == null) {
			logEntryTypes = new ArrayList<>();
		}
		if (!logEntryTypes.contains(logEntryType)) {
			logEntryTypes.add(logEntryType);
			logEntryType.addTrial(this);
		}
	}

	public void removeLogEntryType(LogEntryType logEntryType) {
		if (logEntryTypes != null && logEntryTypes.contains(logEntryType)) {
			logEntryTypes.remove(logEntryType);
			logEntryType.removeTrial(null);
		}
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
		Trial other = (Trial) obj;
		return id == other.id;
	}
	@Override
	public String toString() {
		return "Trial [id=" + id + ", createDate=" + createDate + ", purpose=" + purpose + ", lastUpdate=" + lastUpdate
				+ ", startDate=" + startDate + ", endDate=" + endDate + ", title=" + title + ", published=" + published
				+ "]";
	}
	
	
}
