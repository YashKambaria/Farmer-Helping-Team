package net.engineeringdigest.journalApp.Services;


import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.extern.slf4j.Slf4j;
import net.engineeringdigest.journalApp.Entities.ParkingIssueRequest;
import net.engineeringdigest.journalApp.Entities.UserEntity;
import net.engineeringdigest.journalApp.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class PhoneService {
	
	@Autowired
	public UserRepository userRepository;
	
	@Value("${Twilio.SID}")
	private String SID_ACCOUNT;
	@Value("${Twilio.ID}")
	private String AUTH_ID;
	@Value("${Twilio.NUMBER}")
	private String FROM_NUMBER;
	
	@PostConstruct
	public void setup(){
		Twilio.init(SID_ACCOUNT,AUTH_ID);
	}
	
	public void sendOTP(UserEntity user, String generatedOTP) {
		try {
			String message = "Your OTP Verification Code for Secure Login"
					+ "Dear " + user.getName() + ",\n\n"
					+ "We received a request to verify your email for secure login. Please use the following One-Time Password (OTP) to complete the verification process:\n\n"
					+ "🔐 Your OTP Code: " + generatedOTP
					+ "\n\nThis OTP is valid for 10 minutes. Do not share it with anyone for security reasons.\n\n"
					+ "If you didn’t request this, you can safely ignore this email.\n\n"
					+ "Best regards,\n"
					+ "🚀 Divine Coders Team\n"
					+ "📩 Support: support@email.com";
			Message.creator(
					new PhoneNumber(user.getPhoneNo()),
					new PhoneNumber(FROM_NUMBER),
					message).create();
		}
		catch (Exception e){
			log.error("Error while sending otp ",e);
			throw e;
		}
	}
}
