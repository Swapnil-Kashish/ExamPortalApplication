package com.exam.controller;

import com.exam.config.JwtUtils;
import com.exam.model.JwtRequest;
import com.exam.model.JwtToken;
import com.exam.model.User;
import com.exam.repo.UserRepository;
import com.exam.service.implementation.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.Optional;


@RestController
@CrossOrigin("*")
public class AuthenticateController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtils jwtUtils;



    //API to generate Token

    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {


        try {
            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception ("User not found ");
        }

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(new JwtToken(token));
    }
    private void authenticate(String username,String password) throws Exception {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
        } catch (DisabledException e) {
            throw new Exception("USER DISABLED" + e.getMessage());
        } catch (BadCredentialsException e) {
            throw new Exception ("Invalid Credentials" + e.getMessage());

        }
    }

    @GetMapping("/current-user")

    //Principal principal
    public User getCurrentUser(Principal principal) {

//        if (principal != null) {
//            return ((User) this.userDetailsService.loadUserByUsername(principal.getName()));
//        } else {
//            return null;
//        }
        return (User) Optional.ofNullable(principal)
                .map(Principal::getName)
                .map(this.userDetailsService::loadUserByUsername).orElse(null);
        }

    }



