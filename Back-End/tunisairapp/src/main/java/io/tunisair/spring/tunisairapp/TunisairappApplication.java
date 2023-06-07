package io.tunisair.spring.tunisairapp;

import io.tunisair.spring.tunisairapp.model.Role;
import io.tunisair.spring.tunisairapp.model.users;
import io.tunisair.spring.tunisairapp.service.userservice;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.ArrayList;
import java.util.Arrays;


@SpringBootApplication
public class TunisairappApplication {

	public static void main(String[] args) {
		SpringApplication.run(TunisairappApplication.class, args);
	}
	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}
	/*
	@Bean
	CommandLineRunner run(userservice userService) {
		return args -> {
			userService.saveRole(new Role(null, "ROLE_USER"));
			userService.saveRole(new Role(null, "ROLE_MODERATOR"));
			userService.saveRole(new Role(null, "ROLE_ADMIN"));

			userService.adduser(new users(null,"John", "John@gmail.com", "1234", "ING", new ArrayList<>()));
			userService.adduser(new users(null,"Witt", "Witt@gmail.com", "1234", "ING", new ArrayList<>()));
			userService.adduser(new users(null,"Jim", "Jim@gmail.com", "1234", "ING", new ArrayList<>()));
			userService.adduser(new users(null,"Arnold", "Arnold@gmail.com", "1234", "ING", new ArrayList<>()));

			// Add role to user
			userService.addRoleToUser("John", "ROLE_ADMIN");
			userService.addRoleToUser("Witt", "ROLE_MODERATOR");
			userService.addRoleToUser("Jim", "ROLE_USER");
			userService.addRoleToUser("Arnold", "ROLE_ADMIN");
		};
	}*/
	@Bean
	PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

}
