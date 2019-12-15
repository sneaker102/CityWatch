package com.app.server.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ride_share")
public class RideShare {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ride_share_id;

	@Column(nullable = false,length = 60)
	private String title;

	@Column(nullable = true,length = 60)
	private String description;

	@Column(nullable = false, length = 60)
	private String car_id;

	@Column(nullable = false, length = 60)
	private String car_brand;

	@Column(length = 10)
	private Integer free_seats = 0;

	@Column()
	private Timestamp start_date;

	@OneToMany(
			cascade = CascadeType.ALL,
			orphanRemoval = false,
			mappedBy = "ride_share"
	)
	@JsonManagedReference
	private List<RideSharingUser> rideSharingUsers;

	@OneToMany(
			cascade = CascadeType.ALL,
			orphanRemoval = true,
			mappedBy = "ride_share"
	)
	@JsonManagedReference
	private List<Point> points;

	public Long getRide_share_id() {
		return ride_share_id;
	}

	public void setRide_share_id(Long ride_share_id) {
		this.ride_share_id = ride_share_id;
	}

	public List<Point> getPoints() {
		return points;
	}

	public void setPoints(List<Point> points) {
		this.points = points;
	}

	public void addPoint(Point point) {
		if(this.points == null)
			this.points = new ArrayList<>();
		this.points.add(point);
		point.setRide_share(this);
	}

	public void removePoint(Point point) {
		if (this.points == null)
			return;
		this.points.remove(point);
		point.setRide_share(null);
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCar_id() {
		return car_id;
	}

	public void setCar_id(String car_id) {
		this.car_id = car_id;
	}

	public String getCar_brand() {
		return car_brand;
	}

	public void setCar_brand(String car_brand) {
		this.car_brand = car_brand;
	}

	public Integer getFree_seats() {
		return free_seats;
	}

	public void setFree_seats(Integer free_seats) {
		this.free_seats = free_seats;
	}

	public Timestamp getStart_date() {
		return start_date;
	}

	public void setStart_date(Timestamp start_date) {
		this.start_date = start_date;
	}

	public List<RideSharingUser> getRideSharingUsers() {
		return rideSharingUsers;
	}

	public void setRideSharingUsers(List<RideSharingUser> rideSharingUsers) {
		this.rideSharingUsers = rideSharingUsers;
	}

	public void addRideSharingUser(RideSharingUser rideSharingUser) {
		if(this.rideSharingUsers == null)
			this.rideSharingUsers = new ArrayList<>();
		this.rideSharingUsers.add(rideSharingUser);
		rideSharingUser.setRide_share(this);
	}

	public void removeRideSharingUser(RideSharingUser rideSharingUser) {
		if (this.rideSharingUsers == null)
			return;
		this.rideSharingUsers.remove(rideSharingUser);
		rideSharingUser.setRide_share(null);
	}



}
