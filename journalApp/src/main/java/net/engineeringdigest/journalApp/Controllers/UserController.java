package net.engineeringdigest.journalApp.Controllers;


import lombok.extern.slf4j.Slf4j;
import net.engineeringdigest.journalApp.Entities.OtpValidate;
import net.engineeringdigest.journalApp.Entities.UserEntity;
import net.engineeringdigest.journalApp.Repositories.UserRepository;
import net.engineeringdigest.journalApp.Services.EmailService;
import net.engineeringdigest.journalApp.Services.OtpService;
import net.engineeringdigest.journalApp.Services.UserService;
import net.engineeringdigest.journalApp.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	
	@Autowired
	public OtpService otpService;
	
	
	//CRUD OPERATIOM FOR USER
	@GetMapping("/getUser")
	public ResponseEntity<?> getUser(){
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String name = authentication.getName();
			UserEntity user = userRepository.findByName(name);
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
			
			UserEntity existingUser = userRepository.findByName(loggedInUsername);
			if (existingUser == null) {
				return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
			}
			
			userService.updateUser(UpdateUser, existingUser);
			
			return new ResponseEntity<>(existingUser, HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<>("Error while updating User. Please Try Again Later", HttpStatus.UNAUTHORIZED);
		}
	}
	
	
	@DeleteMapping("/deleteUser")
	public ResponseEntity<?> deleteUser(){
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			if (userRepository.findByName(authentication.getName())!=null) {
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
	
	//USER Verification started
	@GetMapping("/sendOTPEmail")
	public ResponseEntity<?> generateOTP(){
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String username = authentication.getName();
			UserEntity user = userRepository.findByName(username);
			if (user != null) {
				boolean otpSend = otpService.EmailOTP(user);
				if (otpSend) {
					return new ResponseEntity<>("OTP sent", HttpStatus.OK);
				}
				else{
					return new ResponseEntity<>("Error while Generating OTP ",HttpStatus.BAD_REQUEST);
				}
			}
			else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		catch (Exception e){
			log.error("error while generating otp",e);
			return new ResponseEntity<>("Something went wrong please try again ",HttpStatus.BAD_REQUEST);
		}
	}
	@GetMapping("/sendOTPPhone")
	public ResponseEntity<?> generateOTPPhone(){
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String username = authentication.getName();
			UserEntity user = userRepository.findByName(username);
			if (user != null) {
				boolean otpSend = otpService.PhoneOTP(user);
				if (otpSend) {
					return new ResponseEntity<>("OTP sent", HttpStatus.OK);
				}
				else{
					return new ResponseEntity<>("Error while Generating OTP ",HttpStatus.BAD_REQUEST);
				}
			}
			else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		catch (Exception e){
			log.error("error while generating otp",e);
			return new ResponseEntity<>("Something went wrong please try again ",HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@PostMapping("/verifyEmail")
	public ResponseEntity<?> verifyEmail(@RequestBody OtpValidate otpValidate){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		UserEntity user = userRepository.findByName(username);
		
		if (user != null && otpValidate.getOtp()!= null) {
			Instant now = Instant.now();
			if(user.getOTP().equals(otpValidate.getOtp())){
				if (now.isBefore(user.getOtpExpiryTime())) {
					user.setOTP(null);
					user.setEmailVerified(true);
					userRepository.save(user);
					return new ResponseEntity<>("Email verified successfully ", HttpStatus.ACCEPTED);
				}
				else {
					return new ResponseEntity<>("OTP is expired please Regenerate it",HttpStatus.EXPECTATION_FAILED);
				}
			}
			else {
				return new ResponseEntity<>("Invalid OTP ", HttpStatus.BAD_REQUEST);
			}
		}
		else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/verifyPhone")
	public ResponseEntity<?> verifyPhone(@RequestBody OtpValidate otpValidate){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		UserEntity user = userRepository.findByName(username);
		
		if (user != null && otpValidate.getOtp()!= null && user.getOTP()!=null) {
			Instant now = Instant.now();
			if(user.getOTP().equals(otpValidate.getOtp())){
				if (now.isBefore(user.getOtpExpiryTime())) {
					user.setOTP(null);
					user.setPhoneVerified(true);
					userRepository.save(user);
					return new ResponseEntity<>("Phone Number verified succesfully ", HttpStatus.ACCEPTED);
				}
				else {
					return new ResponseEntity<>("OTP is expired please Regenerate it",HttpStatus.EXPECTATION_FAILED);
				}
			}
			else {
				return new ResponseEntity<>("Invalid OTP ", HttpStatus.BAD_REQUEST);
			}
		}
		else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/getCreditScore")
	public ResponseEntity<?> getCreditScore() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String username = authentication.getName();
			UserEntity user = userRepository.findByName(username);
			
			if (user == null) {
				return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
			}
			
			// Create request payload with null checks and default values
			Map<String, Object> requestMap = new HashMap<>();
			requestMap.put("year", user.getYear() != null ? user.getYear() : "2024");
			requestMap.put("country", user.getCountry() != null ? user.getCountry() : "USA");
			requestMap.put("region", user.getRegion() != null ? user.getRegion() : "Midwest");
			requestMap.put("landSize", user.getLandSize() != 0 ? user.getLandSize() : 100.5);
			requestMap.put("soilType", user.getSoilType() != null ? user.getSoilType() : "Loamy");
			requestMap.put("pastYield", user.getPastYield() != 0 ? user.getPastYield() : 50.2);
			requestMap.put("cropTypes", user.getCropTypes() != null ? user.getCropTypes() : "Wheat");
			requestMap.put("annualIncome", user.getAnnualIncome() != 0 ? user.getAnnualIncome() : 50000);
			requestMap.put("soilPH", user.getSoilPH() != 0 ? user.getSoilPH() : 6.5);
			requestMap.put("nitrogenLevel", user.getNitrogenLevel() != 0 ? user.getNitrogenLevel() : 30);
			requestMap.put("organicMatterLevel", user.getOrganicMatterLevel() != 0 ? user.getOrganicMatterLevel() : 20);
			requestMap.put("landQualityScore", user.getLandQualityScore() != 0 ? user.getLandQualityScore() : 85);
			requestMap.put("pastRainfall", user.getPastRainfall() != 0 ? user.getPastRainfall() : 300.2);
			requestMap.put("avgTemperature", user.getAvgTemperature() != 0 ? user.getAvgTemperature() : 25.5);
			requestMap.put("creditScore", 0.0);
			
			// Log the request for debugging
			log.info("Sending request to credit score API: {}", requestMap);
			
			RestTemplate restTemplate = new RestTemplate();
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestMap, headers);
			
			try {
				ResponseEntity<Map> response = restTemplate.postForEntity(
						"https://creditscoreprediction-2ccj.onrender.com/predict",
						entity,
						Map.class
				);
				
				Map<String, Object> responseBody = response.getBody();
				log.info("API Response: {}", responseBody);
				
				// Check if response contains prediction key (the API might have a different structure)
				if (responseBody != null) {
					// Try to find the credit score in the response - could be under different keys
					Object creditScoreObj = responseBody.get("predicted_credit_score");
					if (creditScoreObj == null) {
						creditScoreObj = responseBody.get("prediction");
					}
					
					if (creditScoreObj != null) {
						float creditScore = Float.parseFloat(creditScoreObj.toString());
						user.setCreditScore(creditScore);
						user.setCreditScoreVerified(true);
						userRepository.save(user);
						
						return new ResponseEntity<>(creditScore, HttpStatus.OK);
					} else {
						log.warn("Credit score not found in response: {}", responseBody);
						return new ResponseEntity<>("Credit score not found in API response", HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity<>("Empty response from credit score API", HttpStatus.BAD_REQUEST);
				}
			} catch (org.springframework.web.client.HttpClientErrorException ex) {
				log.error("API error response: {}", ex.getResponseBodyAsString());
				return new ResponseEntity<>("API error: " + ex.getStatusCode() + " - " + ex.getResponseBodyAsString(),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			log.error("Error calculating credit score", e);
			return new ResponseEntity<>("Failed to calculate credit score: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	//USER Verification ended
	
	
}
