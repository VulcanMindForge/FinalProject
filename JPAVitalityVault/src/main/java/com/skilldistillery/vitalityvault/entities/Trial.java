package com.skilldistillery.vitalityvault.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Trial {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@CreationTimestamp
	@Column(name = "create_date")
	private LocalDateTime createDate;
	private String purpose;

	@UpdateTimestamp
	@Column(name = "last_update")
	private LocalDateTime lastUpdate;

	@Column(name = "start_date")
	private LocalDate startDate;
	@Column(name = "end_date")
	private LocalDate endDate;
	private String title;
	private Boolean published;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToMany
	@JsonIgnore
	@JoinTable(name = "trial_has_trial_comment", joinColumns = @JoinColumn(name = "trial_id"), inverseJoinColumns = @JoinColumn(name = "trial_comment_id"))
	private List<TrialComment> comments;

	@OneToOne
	@JsonIgnore
	@JoinColumn(name = "log_entry_type_id")
	private LogEntryType logEntryType;

	public Trial() {
		super();
	}

	public List<TrialComment> getTrialComments() {
		return comments;
	}

	public void setTrialComments(List<TrialComment> comments) {
		this.comments = comments;
	}

	public LogEntryType getLogEntryType() {
		return logEntryType;
	}

	public void setLogEntryType(LogEntryType logEntryType) {
		this.logEntryType = logEntryType;
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

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
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

	public void setLogEntryTypes(List<TrialComment> comments) {
		this.comments = comments;
	}

	public void addTrialComment(TrialComment comment) {
		if (comments == null) {
			comments = new ArrayList<>();
		}
		if (!comments.contains(comment)) {
			comments.add(comment);
			comment.addTrial(this);
		}
	}

	public void removeTrialComment(TrialComment comment) {
		if (comments != null && comments.contains(comment)) {
			comments.remove(comment);
			comment.removeTrial(null);
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
