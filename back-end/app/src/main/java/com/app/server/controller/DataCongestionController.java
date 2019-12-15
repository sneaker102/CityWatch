package com.app.server.controller;

import com.app.server.model.CongestionData;
import com.app.server.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/congestion_data")
public class DataCongestionController {

	@Autowired DataService dataService;

	@GetMapping("/get")
	public List<CongestionData> getCongestionData(@RequestParam String streetName) {
		try {
			return dataService.getCongestionData(streetName);
		}
		catch (InterruptedException e) {
			return null;
		}
	}
}
