package com.app.server.model;

import com.app.server.exception.BadRequestException;

import java.util.Arrays;

public enum RequestType {

	complaint("Complaint"),
	suggestion("Suggestion"),
	hazard("Hazard"),
	rideshare("Ride Sharing"),
	garbage("Garbage");

	RequestType(String s) {
	}

	public static boolean isValid(RequestType requestValue) throws BadRequestException {

		final String value = requestValue.toString();
		return  Arrays.stream(RequestType.values())
				.map(Enum::toString)
				.anyMatch(type -> type.equals(value));

	}
}
