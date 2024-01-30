package com.skilldistillery.vitalityvault.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String username;
	private String password;
	private boolean enabled;
	private String role;
	@Column(name = "first_name")
	private String firstName;
	@Column(name = "last_name")
	private String lastName;
	private LocalDate birthdate;
	private String height;
	private String weight;
	private String sex;
	private String biography;
	@Column(name = "image_url")
	private String imageUrl;
	private String email;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<LogEntry> logEntrys;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Trial> trials;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<LogEntryTypeComment> comments;

	public User() {
		super();
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
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
			logEntry.setUser(this);
		}
	}

	public void removeLogEntry(LogEntry logEntry) {
		if (logEntrys != null && logEntrys.contains(logEntry)) {
			logEntrys.remove(logEntry);
			logEntry.setUser(null);
		}
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
			if (trial.getUser() != null) {
				trial.getUser().removeTrial(trial);
			}
			trial.setUser(this);
		}

	}

	public void removeTrial(Trial trial) {
		if (trials != null && trials.contains(trial)) {
			trials.remove(trial);
			trial.setUser(null);
		}
	}

	public List<LogEntryTypeComment> getComments() {
		return comments;
	}
	public void addLogEntryTypeComment(LogEntryTypeComment comment) {
		if (comments == null) {
			comments = new ArrayList<>();
		}
		if (!comments.contains(comment)) {
			comments.add(comment);
			if (comment.getUser() != null) {
				comment.getUser().removeLogEntryTypeComment(comment);
			}
			comment.setUser(this);
		}
		
	}
	
	public void removeLogEntryTypeComment(LogEntryTypeComment comment) {
		if (comments != null && comments.contains(comment)) {
			comments.remove(comment);
			comment.setUser(null);
		}
	}

	public void setComments(List<LogEntryTypeComment> comments) {
		this.comments = comments;
	}

	public List<LogEntry> getLogEntrys() {
		return logEntrys;
	}

	public void setLogEntrys(List<LogEntry> logEntrys) {
		this.logEntrys = logEntrys;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public LocalDate getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getBiography() {
		return biography;
	}

	public void setBiography(String biography) {
		this.biography = biography;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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
		User other = (User) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", enabled=" + enabled
				+ ", role=" + role + ", firstName=" + firstName + ", lastName=" + lastName + ", birthdate=" + birthdate
				+ ", height=" + height + ", weight=" + weight + ", sex=" + sex + ", biography=" + biography
				+ ", imageUrl=" + imageUrl + ", email=" + email + ", logEntrys=" + logEntrys + ", trials=" + trials
				+ ", comments=" + comments + "]";
	}

}
