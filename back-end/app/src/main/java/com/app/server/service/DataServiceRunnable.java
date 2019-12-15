package com.app.server.service;

import com.app.server.model.CongestionData;
import com.app.server.util.DataUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataServiceRunnable {

	private List<CongestionData> congestionData = new ArrayList<>();
	private String streetName = null;

	public void start(String streetName) {
		this.streetName = streetName;
//		this.run();
	}

//	@Override public void run() {
//		this.congestionData = DataUtils.run(this.streetName);
//	}

	public List<CongestionData> getCongestionData(String streetName) {

		return this.congestionData = DataUtils.run(streetName);
	}
}
