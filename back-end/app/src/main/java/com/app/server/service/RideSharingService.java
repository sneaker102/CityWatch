package com.app.server.service;

import com.app.server.model.RideShare;
import com.app.server.model.RideSharingUser;
import com.app.server.model.User;
import com.app.server.repository.RideShareRepository;
import com.app.server.repository.RideSharingUserRepository;
import com.app.server.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.EntityManagerFactoryUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
public class RideSharingService {

	@Autowired
	RideShareRepository rideShareRepository;

	@Autowired
	RideSharingUserRepository rideSharingUserRepository;

	@PersistenceContext
	EntityManager entityManager;

	public RideSharingService() {
	}

	public void setRideProvider(RideShare rideShare) throws  Exception {

		RideSharingUser rideSharingUser = addUserDetails(rideShare);
		rideSharingUser.setRideProvider(true);
		rideShare.addRideSharingUser(rideSharingUser);
	}

	public void addRideClient(RideShare rideShare) throws Exception {

		addUserDetails(rideShare);
	}

	private User getUserFromContext() throws Exception {
		return Optional.ofNullable(((UserPrincipal)
				SecurityContextHolder
						.getContext()
						.getAuthentication()
						.getPrincipal())
				.getUser()).orElseThrow(() -> new Exception("Could not determine user"));
	}

	public RideSharingUser addUserDetails(RideShare rideShare) throws Exception {
		User user = getUserFromContext();
		Long userID = user.getId();
		RideSharingUser rideSharingUser = new RideSharingUser();
		rideSharingUser.setUser_name(user.getName());
		rideSharingUser.setUser_id(userID);
		rideSharingUser.setRide_share(rideShare);

		Optional<Integer> rides_no = StreamSupport.stream(rideSharingUserRepository.findAll().spliterator(),false)
						.filter(rsUser -> rsUser.getUser_id().equals(user.getId()))
						.findFirst()
						.map(RideSharingUser::getNo_of_rides);

		if (rides_no.isPresent()) {
			Integer new_rides_no = rides_no.get();
			rideSharingUser.setNo_of_rides(++new_rides_no );
		}
		else
			rideSharingUser.setNo_of_rides(1);

		return rideSharingUser;
	}
}
