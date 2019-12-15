package com.app.server.repository;

import com.app.server.model.RideShare;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RideSharingRepository extends JpaRepository<RideShare,Long> {

}
