package com.app.server.controller;


import com.app.server.exception.BadRequestException;
import com.app.server.model.Request;
import com.app.server.model.RequestStatus;
import com.app.server.model.RequestType;
import com.app.server.model.User;
import com.app.server.payload.ApiResponse;
import com.app.server.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/request")
public class RequestController {

	@Autowired RequestRepository requestRepository;

	@PostMapping("/add")
	public ResponseEntity<?> createRequest(@Valid @RequestBody Request requestData) {

		Request request;
		if(requestData != null) {
			request = new Request();
		} else
			throw new BadRequestException("Response body is empty");

		request = updateFromData(request,requestData);

		Request result = requestRepository.save(request);

		final URI location = ServletUriComponentsBuilder
				.fromCurrentContextPath()
				.buildAndExpand(result).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true,"Request created successfully"));
	}

	@PostMapping("/update")
	public ApiResponse updateRequest(@Valid @RequestBody Request requestData, @RequestParam Long request_id)
			throws Exception {

		Request request;
		if(requestData == null) {
			throw new BadRequestException("Response body is empty");
		}
		if(request_id == null) {
			throw new BadRequestException("No Request ID Parameter found");
		}
		request = requestRepository.findById(request_id).orElseThrow(
				() -> new Exception("No request found"));

		updateFromData(request,requestData);

		return new ApiResponse(true,"Updated");
	}

	public Request updateFromData(Request request, Request requestData) throws BadRequestException {

		request.setTitle(requestData.getTitle());
		request.setDescription(requestData.getDescription());
		request.setLatitude(requestData.getLatitude());
		request.setLongitude(requestData.getLongitude());
//		request.setLikes(requestData.getLikes());

		if(requestData.getRequest_type() == null)
			throw new BadRequestException("Request type not specified");

		if(requestData.getStatus() == null)
			throw new BadRequestException("Request status not specified");

		if(RequestStatus.isValid(requestData.getStatus()))
			request.setStatus(requestData.getStatus());
		else
			throw new BadRequestException("Request status not valid!");

		if(RequestType.isValid(requestData.getRequest_type()))
			request.setRequest_type(requestData.getRequest_type());
		else
			throw new BadRequestException("Request type not valid");

		return request;
	}

	@GetMapping("/list")
	public List<Request> getRequests(@RequestParam(required = false)Integer id,
			@RequestParam(required = false) RequestStatus requestStatus,
			@RequestParam(required = false) RequestType requestType,
			@RequestParam(required = false) User user) {

		ArrayList<Predicate<Request>> predicates = new ArrayList<>();
		if(id != null)
			predicates.add((request) -> request.getRequest_id() == id.longValue());
		if(requestStatus != null)
			predicates.add((request) -> request.getStatus() == requestStatus);
		if(requestType != null)
			predicates.add((request) -> request.getRequest_type() == requestType);
		if(user != null)
			predicates.add((request) -> request.getCreatedBy() == user);


		return requestRepository.findAll()
				.stream()
				.filter(request -> predicates.stream()
						.allMatch(requestPredicate -> requestPredicate
								.test(request)))
				.collect(Collectors.toList());
	}

}
