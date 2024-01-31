package com.skilldistillery.vitalityvault.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "trial_comment")
public class TrialComment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String content;

	@Column(name = "content_date")
	private LocalDateTime contentDate;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToMany(mappedBy = "comments")
	@JsonIgnore
	private List<Trial> trials;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getContentDate() {
		return contentDate;
	}

	public void setContentDate(LocalDateTime contentDate) {
		this.contentDate = contentDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Trial> getTrials() {
		return trials;
	}

	public void setTrials(List<Trial> trials) {
		this.trials = trials;
	}

	public void addTrial(Trial trial) {
		if (trials == null) {
			trials = new ArrayList<>();
		}
		if (!trials.contains(trial)) {
			trials.add(trial);
			trial.addTrialComment(this);
		}
	}

	public void removeTrial(Trial trial) {
		if (trials != null && trials.contains(trial)) {
			trials.remove(trial);
			trial.removeTrialComment(null);
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
		TrialComment other = (TrialComment) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "LogEntryTypeComment [id=" + id + ", content=" + content + ", contentDate=" + contentDate + "]";
	}

	public TrialComment() {
		super();
	}

}
