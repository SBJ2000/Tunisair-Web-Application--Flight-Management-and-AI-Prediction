package io.tunisair.spring.tunisairapp.security;

import io.tunisair.spring.tunisairapp.filter.CustomAuthenticationFilter;
import io.tunisair.spring.tunisairapp.filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration @EnableWebSecurity @RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new
                UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors();
        http.sessionManagement().sessionCreationPolicy(STATELESS);

        http.authorizeRequests()
                .antMatchers("/login", "/user/token/refresh").permitAll()
                .antMatchers(HttpMethod.GET, "/user/**").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.POST, "/user/**").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.PUT, "/user/**").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.DELETE, "/user/**/**").hasAuthority("ROLE_ADMIN")

                .antMatchers(HttpMethod.GET, "/pilotes/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_USER")
                .antMatchers(HttpMethod.POST, "/pilotes/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")
                .antMatchers(HttpMethod.PUT, "/pilotes/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")
                .antMatchers(HttpMethod.DELETE, "/pilotes/**/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")

                .antMatchers(HttpMethod.GET, "/copilotes/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_USER")
                .antMatchers(HttpMethod.POST, "/copilotes/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")
                .antMatchers(HttpMethod.PUT, "/copilotes/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")
                .antMatchers(HttpMethod.DELETE, "/copilotes/**/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")

                .antMatchers(HttpMethod.GET, "/staffs/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_USER")
                .antMatchers(HttpMethod.POST, "/staffs/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")
                .antMatchers(HttpMethod.PUT, "/staffs/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")
                .antMatchers(HttpMethod.DELETE, "/staffs/**/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")

                .antMatchers(HttpMethod.GET, "/companies/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_USER")
                .antMatchers(HttpMethod.POST, "/companies/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")
                .antMatchers(HttpMethod.PUT, "/companies/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")
                .antMatchers(HttpMethod.DELETE, "/companies/**/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")

                .antMatchers(HttpMethod.GET, "/flights/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_USER")
                .antMatchers(HttpMethod.POST, "/flights/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")
                .antMatchers(HttpMethod.PUT, "/flights/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")
                .antMatchers(HttpMethod.DELETE, "/flights/**/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MODERATOR")

                .anyRequest().authenticated();

        http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean()));
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }



    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
