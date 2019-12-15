package com.app.server.service;

import com.app.server.model.CongestionData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class DataService {

//	ExecutorService executorService = Executors.newSingleThreadExecutor();

	@Autowired DataServiceRunnable dataServiceRunnable;

	public List<CongestionData> getCongestionData(String streetName) {

//		executorService.execute(() -> dataServiceRunnable.start(streetName));
//		while (!executorService.isTerminated()) {
//
//		}
//		List<CongestionData> congestionData = dataServiceRunnable.getCongestionData();
//		executorService.shutdown();
		return dataServiceRunnable.getCongestionData(streetName);
	}
}
