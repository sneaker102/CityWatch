package com.app.server.service;

import com.app.server.model.CongestionData;
import com.app.server.util.DataUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataServiceRunnable implements Runnable {

	private List<CongestionData> congestionData = new ArrayList<>();
	private String streetName = null;
	private DataService dataService;

	public void start(String streetName) {
		this.streetName = streetName;
	}

	@Override public void run() {
		this.congestionData = DataUtils.run(this.streetName);
		dataService.setCongestionData(this.congestionData);
	}

	public String getStreetName() {
		return streetName;
	}

	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}

	public List<CongestionData> getCongestionData() {

		return this.congestionData;
	}

	public void setCongestionData(List<CongestionData> congestionData) {
		this.congestionData = congestionData;
	}

	public DataService getDataService() {
		return dataService;
	}

	public void setDataService(DataService dataService) {
		this.dataService = dataService;
	}
}
