package com.app.server.repository;

import com.app.server.model.RequestComplaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<RequestComplaint,Long> {


}
