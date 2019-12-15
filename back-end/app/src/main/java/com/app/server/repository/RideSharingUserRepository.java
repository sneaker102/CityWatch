package com.app.server.repository;

import com.app.server.model.RideSharingUser;
import org.springframework.data.repository.CrudRepository;

public interface RideSharingUserRepository extends CrudRepository<RideSharingUser,Long> {
}
