package com.app.server.config;

import com.app.server.model.User;
import com.app.server.repository.UserRepository;
import com.app.server.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class AuditConfig {

	@Autowired UserRepository userRepository;

	@Bean
	public AuditorAware<User> auditorProvider() throws Exception {

		return () ->
			Optional.ofNullable(((UserPrincipal)
					SecurityContextHolder
							.getContext()
							.getAuthentication()
							.getPrincipal())
					.getUser());
	}
}