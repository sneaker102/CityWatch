package com.app.server;

import com.app.server.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class ServerApplication {
	//jdbc:mysql://localhost:3306/sys?autoReconnect=true&amp;useUnicode=yes&amp;characterEncoding=UTF-8&amp;useJDBCCompliantTimezoneShift=true&amp;useLegacyDatetimeCode=false&amp;serverTimezone=Europe/Bucharest
	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
