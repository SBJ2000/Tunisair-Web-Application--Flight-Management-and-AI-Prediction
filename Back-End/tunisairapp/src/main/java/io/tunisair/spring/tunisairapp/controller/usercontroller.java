package io.tunisair.spring.tunisairapp.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.tunisair.spring.tunisairapp.model.Role;
import io.tunisair.spring.tunisairapp.model.users;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import io.tunisair.spring.tunisairapp.service.userservice;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

@RestController
@RequestMapping("/user") @RequiredArgsConstructor
public class usercontroller {
    private final userservice userservice;

    @GetMapping("/all")
    public ResponseEntity<List<users>>getallusers()
    {
        List<users> users = userservice.findallusers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<users> adduser(@RequestBody users user)
    {
        users newuser = userservice.adduser(user);
        return new ResponseEntity<>(newuser, HttpStatus.CREATED);
    }
    @PostMapping("/addrole")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        Role newRole = userservice.saveRole(role);
        return new ResponseEntity<>(newRole, HttpStatus.CREATED);
    }
    @PostMapping("/addroletouser")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm form) {
        System.out.println("Incoming form: " + form.toString()); // Log the form
        userservice.addRoleToUser(form.getUsername(), form.getRolename());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            try{
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                users user = userservice.getuser(username);

                String access_token = JWT.create()
                        .withSubject(user.getName())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles",user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);

                Map<String , String> tokens = new HashMap<>();
                tokens.put("access_token",access_token);
                tokens.put("refresh_token",refresh_token);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(),tokens);
            }catch (Exception exception){
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String , String> error = new HashMap<>();
                error.put("error_message",exception.getMessage());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(),error);
            }

        }
        else {
            throw new RuntimeException("Refresh Token Is Missing");
        }

    }
    @PutMapping("/update")
    public ResponseEntity<users> updateUser(@RequestBody users updatedUser) {
        users user = userservice.updateuser(updatedUser);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping ("/delete/{id}")
    public ResponseEntity<?> deleteuser(@PathVariable("id") UUID id)
    {
        userservice.deleteuser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<users> getUserById(@PathVariable("id") UUID id) {
        System.out.println("User ID: " + id);
        users user = userservice.finduserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @PostMapping("/signin")
    public ResponseEntity<users> signIn(@RequestBody users requestResponsable) {
        users user = userservice.signIn(requestResponsable.getEmail(), requestResponsable.getCode());
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
@Data
class RoleToUserForm{
    private String username;
    private String rolename;
}