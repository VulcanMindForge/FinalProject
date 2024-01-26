package com.skilldistillery.vitalityvault.entities;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
	private Date birthdate;
	private String sex;
	private String biography;
	@Column(name = "image_url")
	private String imageUrl;

	@OneToMany(mappedBy = "user")
	private List<LogEntry> logEntrys;

	public User() {
		super();
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

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
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
				+ ", sex=" + sex + ", biography=" + biography + ", imageUrl=" + imageUrl + "]";
	}

}
