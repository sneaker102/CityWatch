package com.app.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ride_sharing_user")
public class RideSharingUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ride_sharing_user_id;

	@Column()
	private Double rating = 0.0;

	@Column(nullable = false)
	private String user_name;

	@Column(nullable = false)
	private Long user_id;

	@Column()
	private Integer no_of_rides = 0;

	@ManyToOne
	@JoinColumn(name = "ride_share_id")
	@JsonBackReference
	private RideShare ride_share;

	@JsonIgnore
	private Boolean isRideProvider;

	@Query(value = "", nativeQuery = true)
	

	public Long getRide_sharing_user_id() {
		return ride_sharing_user_id;
	}

	public void setRide_sharing_user_id(Long ride_sharing_user_id) {
		this.ride_sharing_user_id = ride_sharing_user_id;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public Integer getNo_of_rides() {
		return no_of_rides;
	}

	public void setNo_of_rides(Integer no_of_rides) {
		this.no_of_rides = no_of_rides;
	}

	public RideShare getRide_share() {
		return ride_share;
	}

	public void setRide_share(RideShare rideShare) {
		this.ride_share = rideShare;
	}

	public Boolean getRideProvider() {
		return isRideProvider;
	}

	public void setRideProvider(Boolean rideProvider) {
		isRideProvider = rideProvider;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
}
