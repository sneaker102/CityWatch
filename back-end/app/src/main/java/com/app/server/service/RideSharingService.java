package com.app.server.service;

import com.app.server.model.RideShare;
import com.app.server.model.RideSharingUser;
import com.app.server.model.User;
import com.app.server.repository.RideShareRepository;
import com.app.server.repository.RideSharingUserRepository;
import com.app.server.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

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

	public void setIsRideProvider(RideShare rideShare) throws  Exception {
		User user = Optional.ofNullable(((UserPrincipal)
				SecurityContextHolder
						.getContext()
						.getAuthentication()
						.getPrincipal())
				.getUser()).orElseThrow(() -> new Exception("Could not determine user"));

		Long userID = user.getId();
		RideSharingUser rideSharingUser = new RideSharingUser();
		rideSharingUser.setUser_name(user.getName());
		rideSharingUser.setUser_id(userID);
		rideSharingUser.setRide_share(rideShare);
		rideSharingUser.setRideProvider(true);

		Integer rides_no = entityManager.createQuery("select u.no_of_rides from ride_sharing_user u " +
				" where u.user_id = :userID", Integer.class).getSingleResult();

		if (rides_no != null)
			rideSharingUser.setNo_of_rides(++rides_no);
		else
			rideSharingUser.setNo_of_rides(1);
		rideShare.addRideSharingUser(rideSharingUser);
	}
}
