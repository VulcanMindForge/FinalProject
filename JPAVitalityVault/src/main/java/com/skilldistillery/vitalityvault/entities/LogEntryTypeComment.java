package com.skilldistillery.vitalityvault.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="log_entry_type_comment")
public class LogEntryTypeComment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String content;
	
	@Column(name="content_date")
	private LocalDateTime contentDate;

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
		LogEntryTypeComment other = (LogEntryTypeComment) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "LogEntryTypeComment [id=" + id + ", content=" + content + ", contentDate=" + contentDate + "]";
	}

	public LogEntryTypeComment() {
		super();
	}

}
