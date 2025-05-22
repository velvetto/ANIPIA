package com.anipia.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // H2 konzole vyžaduje vypnutí CSRF
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()))  // povolit iframe pro H2 konzoli
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/h2-console/**").permitAll() // povolit přístup k h2-console
                .anyRequest().permitAll() // ostatní také povolit
            );

        return http.build();
    }
}