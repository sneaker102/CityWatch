package com.app.server.controller;

import com.app.server.exception.BadRequestException;
import com.app.server.model.Request;
import com.app.server.model.RideShare;
import com.app.server.payload.ApiResponse;
import com.app.server.repository.RideShareRepository;
import com.app.server.security.UserPrincipal;
import com.app.server.service.RideSharingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ride_share")
public class RideShareController {

	final RideShareRepository rideShareRepository;

	final RideSharingService rideSharingService;


	public RideShareController(@Autowired RideShareRepository rideShareRepository) {
		this.rideShareRepository = rideShareRepository;
		this.rideSharingService = new RideSharingService();
	}

	@PostMapping("/add")
	public ResponseEntity<?> createRequest(@Valid @RequestBody RideShare requestData) throws Exception {

		RideShare rideShare;
		if(requestData != null) {
			rideShare = new RideShare();
		} else
			throw new BadRequestException("Response body is empty");

		rideShare = updateFromData(rideShare,requestData);

		rideSharingService.setIsRideProvider(rideShare);
		RideShare result = rideShareRepository.save(rideShare);

		final URI location = ServletUriComponentsBuilder
				.fromCurrentContextPath()
				.buildAndExpand(result).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true,"Ride share created successfully"));
	}

	@GetMapping("/list")
	public List<RideShare> getRideShares(

	) {
		return rideShareRepository.findAll();
	}

	public RideShare updateFromData(RideShare rideShare, RideShare rideShareData) {

		rideShare = rideShareData;
		rideShareData.getPoints()
				.stream()
				.forEach(point -> point.setRide_share(rideShareData));

		Optional.ofNullable(((UserPrincipal)
				SecurityContextHolder
						.getContext()
						.getAuthentication()
						.getPrincipal())
				.getUser());

		rideShare.setPoints(rideShareData.getPoints());

		return rideShareData;
	}
}
