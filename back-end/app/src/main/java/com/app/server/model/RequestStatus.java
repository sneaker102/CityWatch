package com.app.server.model;

import com.app.server.exception.BadRequestException;

import java.util.Arrays;

public enum RequestStatus {

	pending("Pending"),
	inprogress("In Progress"),
	complete("Complete");

	 RequestStatus(String value) {
	}

	public static boolean isValid(RequestStatus requestValue) throws BadRequestException {

	 	final String value = requestValue.toString();
		return  Arrays.stream(RequestStatus.values())
				.map(Enum::toString)
				.anyMatch(type -> type.equals(value));

	}
}
