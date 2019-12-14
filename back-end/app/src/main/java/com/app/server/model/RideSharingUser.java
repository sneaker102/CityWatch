package com.app.server.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ride_sharing_user")
public class RideSharingUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ride_sharing_user_id;

	@Column()
	private Double rating;

	@OneToOne
	private User user;

	@Column()
	private Integer no_of_rides;


}
