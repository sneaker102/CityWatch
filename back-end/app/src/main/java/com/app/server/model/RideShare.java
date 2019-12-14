package com.app.server.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ride_share")
public class RideShare {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ride_share_id;

	@Column(nullable = false)
	private String lat_start;

	@Column(nullable = false)
	private String long_start;

	@Column(nullable = false)
	private String lat_end;

	@Column(nullable = false)
	private String long_end;




}
