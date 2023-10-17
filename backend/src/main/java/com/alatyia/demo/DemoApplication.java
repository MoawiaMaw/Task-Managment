package com.alatyia.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				.allowedOrigins(
								"http://localhost",
								"http://172.18.238.126",
								"http://localhost:80",
								"http://172.18.238.126:80",
								"http://localhost:4200",
								"http://172.18.238.126:4200")
						.allowedMethods("GET", "POST", "PUT", "DELETE");
			}
		};
	}

}
