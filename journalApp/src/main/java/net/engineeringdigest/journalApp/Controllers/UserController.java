package net.engineeringdigest.journalApp.Controllers;


import lombok.extern.slf4j.Slf4j;
import net.engineeringdigest.journalApp.Entities.UserEntity;
import net.engineeringdigest.journalApp.Entities.Vehicle;
import net.engineeringdigest.journalApp.Repositories.UserRepository;
import net.engineeringdigest.journalApp.Services.EmailService;
import net.engineeringdigest.journalApp.Services.UserService;
import net.engineeringdigest.journalApp.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	@Autowired
	public UserService userService;
	
	@Autowired
	public UserRepository userRepository;
	
	@Autowired
	public EmailService emailService;
	
	@Autowired
	public JwtUtil jwtUtil;
	
	
	//CRUD OPERATIOM FOR USER
	@GetMapping("/getUser")
	public ResponseEntity<?> getUser(){
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String name = authentication.getName();
			UserEntity user = userRepository.findByUsername(name);
			return new ResponseEntity<>(user, HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}
	
	@PutMapping("/updateDetails")
	public ResponseEntity<?> updateUserDetails(@RequestBody UserEntity UpdateUser) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String loggedInUsername = authentication.getName();
			
			UserEntity existingUser = userRepository.findByUsername(loggedInUsername);
			if (existingUser == null) {
				return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
			}
			
			userService.updateUser(UpdateUser, existingUser);
			
			return new ResponseEntity<>(existingUser, HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<>("Error while updating User. Please Try Again Later", HttpStatus.UNAUTHORIZED);
		}
	}
	@PostMapping("/deleteVehicle")
	public ResponseEntity<?> deleteVehicle(@RequestBody Vehicle vehicle){
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			UserEntity user = userRepository.findByUsername(authentication.getName());
			if (user != null) {
				List<Vehicle> vehicles = user.getVehicles();
				vehicles.remove(vehicle);
				userService.saveEntry(user);
				return new ResponseEntity<>(HttpStatus.OK);
			}
			else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		catch (Exception e){
			log.error("error while deleting vehicle ----------->",e);
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}
	
	
	@PostMapping("/addVehicles")
	public ResponseEntity<?> addVehicles(@RequestBody Vehicle vehicle){
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			UserEntity user = userRepository.findByUsername(authentication.getName());
			if (user != null) {
				userService.addVehicle(user,vehicle);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				log.error("error while adding vehicle");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		catch (Exception e) {
			log.error("error while adding vehicle", e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/deleteUser")
	public ResponseEntity<?> deleteUser(){
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			if (userRepository.findByUsername(authentication.getName())!=null) {
				userService.deleteByUserName(authentication.getName());
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		catch (Exception e){
			log.error("User not found ",e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	
}
