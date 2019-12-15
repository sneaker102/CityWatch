package com.app.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ride_share_points")
public class Point {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long point_id;

	@ManyToOne
	@JoinColumn(name = "ride_share_id")
	@JsonBackReference
	private RideShare ride_share;

	@Column
	private double lat_point;

	@Column
	private double long_point;

	public Long getPoint_id() {
		return point_id;
	}

	public void setPoint_id(Long point_id) {
		this.point_id = point_id;
	}

	public RideShare getRide_share() {
		return ride_share;
	}

	public void setRide_share(RideShare ride_share) {
		this.ride_share = ride_share;
	}

	public double getLat_point() {
		return lat_point;
	}

	public void setLat_point(double lat_point) {
		this.lat_point = lat_point;
	}

	public double getLong_point() {
		return long_point;
	}

	public void setLong_point(double long_point) {
		this.long_point = long_point;
	}
}
