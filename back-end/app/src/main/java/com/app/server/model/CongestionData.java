package com.app.server.model;

import java.sql.Timestamp;

public class CongestionData {

	private String street;
	private int trafficAvgSpeed;
	private int avgMeasuredTime;
	private int carsNo;
	private Timestamp date;

	public CongestionData(String street, int trafficAvgSpeed, int avgMeasuredTime, int carsNo, Timestamp date) {
		this.street = street;
		this.trafficAvgSpeed = trafficAvgSpeed;
		this.avgMeasuredTime = avgMeasuredTime;
		this.carsNo = carsNo;
		this.date = date;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public int getTrafficAvgSpeed() {
		return trafficAvgSpeed;
	}

	public void setTrafficAvgSpeed(int trafficAvgSpeed) {
		this.trafficAvgSpeed = trafficAvgSpeed;
	}

	public int getAvgMeasuredTime() {
		return avgMeasuredTime;
	}

	public void setAvgMeasuredTime(int avgMeasuredTime) {
		this.avgMeasuredTime = avgMeasuredTime;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public int getCarsNo() {
		return carsNo;
	}

	public void setCarsNo(int carsNo) {
		this.carsNo = carsNo;
	}
}
