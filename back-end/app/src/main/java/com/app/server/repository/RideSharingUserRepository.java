package com.app.server.repository;

import com.app.server.model.RideShare;
import com.app.server.model.RideSharingUser;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RideSharingUserRepository extends CrudRepository<RideSharingUser,Long> {

//	Optional<RideSharingUser> findByuser_id(Long userID);
}
