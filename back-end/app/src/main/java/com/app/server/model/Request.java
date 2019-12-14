package com.app.server.model;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.Optional;

@Entity
@Table(name = "request")
public class Request extends Auditable<User> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long request_id;

	@Column(nullable = false)
	private String longitude;

	@Column(nullable = false)
	private String latitude;

	@Enumerated(EnumType.STRING)
	private RequestType request_type;

	@Enumerated(EnumType.STRING)
	private RequestStatus status;

	@Column(nullable = false)
	private String description;

	@Column(nullable =  false)
	private String title;

	@Column()
	private Integer likes;

	@Column(insertable = false,updatable = false)
	private Timestamp created_date = super.getCreatedDate();
	@Column(insertable = false,updatable = false)
	private Timestamp last_modified_date = super.getLastModifiedDate();
	@Column(insertable = false,updatable = false)
	private String created_by = Optional.ofNullable(super.getCreatedBy()).map(User::getName).orElse(null);
	@Column(insertable = false,updatable = false)
	private String last_updated_by = Optional.ofNullable(super.getLastModifiedBy()).map(User::getName).orElse(null);

//	public Request() {
//		if(super.getCreatedDate() != null)
//			this.created_date = super.getCreatedDate();
//		if(super.getCreatedBy() != null)
//			this.last_modified_date = super.getLastModifiedDate();
//		if(super.getCreatedBy() != null)
//			this.created_by = super.getCreatedBy().getName();
//		if(super.getLastModifiedBy() != null)
//			this.last_updated_by = super.getLastModifiedBy().getName();
//	}

	public Long getRequest_id() {
		return request_id;
	}

	public void setRequest_id(Long requestID) {
		this.request_id = requestID;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public RequestType getRequest_type() {
		return request_type;
	}

	public void setRequest_type(RequestType requestType) {
		this.request_type = requestType;
	}

	public RequestStatus getStatus() {
		return status;
	}

	public void setStatus(RequestStatus status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getLikes() {
		return likes;
	}

	public void setLikes(Integer likes) {
		this.likes = likes;
	}
}
