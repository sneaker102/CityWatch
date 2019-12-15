package com.app.server.service;

import com.app.server.model.CongestionData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class DataService {

	ExecutorService executorService = Executors.newFixedThreadPool(4);
	List<CongestionData> congestionData = new ArrayList<>();

	final DataServiceRunnable dataServiceRunnable;

	public DataService(@Autowired  DataServiceRunnable dataServiceRunnable) {
		this.dataServiceRunnable = dataServiceRunnable;
		this.dataServiceRunnable.setDataService(this);
	}

	public List<CongestionData> getCongestionData(String streetName) throws InterruptedException {

		dataServiceRunnable.setStreetName(streetName);

		Thread thread =  new Thread(dataServiceRunnable);

		thread.start();
		thread.join();
//		executorService.shutdown();
		return dataServiceRunnable.getCongestionData();
	}

	public List<CongestionData> getCongestionData() {
		return congestionData;
	}

	public void setCongestionData(List<CongestionData> congestionData) {
		this.congestionData = congestionData;
	}
}
