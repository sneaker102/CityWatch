package com.app.server.controller;


import com.app.server.exception.BadRequestException;
import com.app.server.model.RequestComplaint;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/request")
public class RequestController {


	@PostMapping("request/add")
	public ResponseEntity<?> createRequest(@Valid @RequestBody RequestComplaint requestComplaint) {
		if(requestComplaint != null) {
			RequestComplaint request = new RequestComplaint();
		} else
			throw new BadRequestException("Response body is empty");
		return null;
	}

}
