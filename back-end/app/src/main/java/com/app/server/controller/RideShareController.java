package com.app.server.controller;

import com.app.server.exception.BadRequestException;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/ride_share")
public class RideShareController {

	final RideShareRepository rideShareRepository;

	final RideSharingService rideSharingService;


	public RideShareController(@Autowired RideShareRepository rideShareRepository, @Autowired RideSharingService rideSharingService) {
		this.rideShareRepository = rideShareRepository;
		this.rideSharingService = rideSharingService;
	}

	@PostMapping("/add")
	public ResponseEntity<?> addProvider(@Valid @RequestBody RideShare requestData) throws Exception {

		RideShare rideShare;
		if(requestData != null) {
			rideShare = new RideShare();
		} else
			throw new BadRequestException("Response body is empty");

		rideShare = updateFromData(requestData);

		rideSharingService.setRideProvider(rideShare);
		RideShare result = rideShareRepository.save(rideShare);

		final URI location = ServletUriComponentsBuilder
				.fromCurrentContextPath()
				.buildAndExpand(result).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true,"Ride share created successfully"));
	}

	@PostMapping("/add_client")
	public ResponseEntity<?> addClient(@RequestParam Long ride_share_id) throws Exception {

		if(ride_share_id == null)
			throw new Exception("Request parameter ride_share_id not found");

		Optional<RideShare> rideShare = rideShareRepository.findById(ride_share_id);

		if(rideShare.isPresent()) {

			rideSharingService.addRideClient(rideShare.get());
			RideShare result = rideShareRepository.save(rideShare.get());

			final URI location = ServletUriComponentsBuilder
					.fromCurrentContextPath()
					.buildAndExpand(result).toUri();

			return ResponseEntity.created(location).body(new ApiResponse(true, "Ride share created successfully"));
		}
		else
			throw new Exception("RideShare not found for id" + ride_share_id);
	}

	@GetMapping("/list")
	public List<RideShare> getRideShares(

	) {
		return rideShareRepository.findAll()
				.stream()
				.filter(rideShare -> !rideShare.getIs_completed())
				.collect(Collectors.toList());
	}

	public RideShare updateFromData(RideShare rideShareData) {

		rideShareData.getPoints()
				.stream()
				.forEach(point -> point.setRide_share(rideShareData));

		Optional.ofNullable(((UserPrincipal)
				SecurityContextHolder
						.getContext()
						.getAuthentication()
						.getPrincipal())
				.getUser());

		rideShareData.setPoints(rideShareData.getPoints());

		return rideShareData;
	}
}
