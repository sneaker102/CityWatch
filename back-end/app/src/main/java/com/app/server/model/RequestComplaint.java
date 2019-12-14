package com.app.server.model;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "requests")
public class RequestComplaint extends Auditable<User> {

	@Id
	private Long requestID;

	@Column(nullable = false)
	private String longitude;

	@Column(nullable = false)
	private String latitude;

	@Enumerated(EnumType.STRING)
	private RequestType requestType;

	@Enumerated(EnumType.STRING)
	private RequestStatus status;

	@Column(nullable = false)
	private String description;

	@Column(nullable =  false)
	private String title;

	@Column()
	@ColumnDefault(value = "0")
	private Integer likes;

}
