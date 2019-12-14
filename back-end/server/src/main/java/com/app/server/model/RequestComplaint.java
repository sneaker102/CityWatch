package com.app.server.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "requests")
public class RequestComplaint {

	@Id
	private Long requestID;

	@OneToOne
	private User user;

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

}
