package net.engineeringdigest.journalApp.Entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "USERS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
	@Id
	private ObjectId id;
	@NonNull
	private String name;
	@NonNull
	private String password;
	private String phoneNo;
	@NonNull
	private String email;
	private List<String> roles;
	private String OTP;
	private Instant otpExpiryTime;
	private boolean isEmailVerified;
	private boolean isPhoneVerified;
	
	private boolean isLoanApproved;
	private String year;
	private String country;
	private String region;
	private float landSize;
	private String soilType;
	private float pastYield;
	private String cropTypes;
	private long  annualIncome;
	private float soilPH;
	private int nitrogenLevel;
	private int organicMatterLevel;
	private int landQualityScore;
	private float pastRainfall;
	private float avgTemperature;
	private boolean isCreditScoreVerified;
	private float creditScore;
	private List<String> history=new ArrayList<>();
}
