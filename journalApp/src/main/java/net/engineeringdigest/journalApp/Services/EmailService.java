package net.engineeringdigest.journalApp.Services;

import lombok.extern.slf4j.Slf4j;
import net.engineeringdigest.journalApp.Entities.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {
	
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	public void sendEmail(String to,String subject,String body){
		try{
			SimpleMailMessage mail=new SimpleMailMessage();
			mail.setTo(to);
			mail.setSubject(subject);
			mail.setText(body);
			javaMailSender.send(mail);
			
		}
		catch (Exception e){
			log.error("Exception while sendEmail",e);
		}
	}
	
	public void sendAlert(UserEntity farmer,String BankName) {
		String subject = "Loan Approval Confirmation";
		String message = "Dear "+farmer.getName()+",\n\n"
				+ "We are pleased to inform you that your loan application has been successfully approved. "
				+ "The approved amount will be credited to your registered bank account shortly.\n\n"
				+ "If you have any questions or require further assistance, please feel free to contact our support team.\n\n"
				+ "Thank you for choosing our services. We wish you success in your farming endeavors!\n\n"
				+ "Best regards,\n"
				+ BankName;
		sendEmail(farmer.getEmail(), subject, message);
	}
	public void sendOTP(UserEntity farmer,String OTP){
		String subject = "Your OTP Verification Code for Secure Login";
		String message = "Dear User,\n\n"
				+ "We received a request to verify your email for secure login. Please use the following One-Time Password (OTP) to complete the verification process:\n\n"
				+ "🔐 Your OTP Code: "+ OTP
				+"\n\nThis OTP is valid for 10 minutes. Do not share it with anyone for security reasons.\n\n"
				+ "If you didn’t request this, you can safely ignore this email.\n\n"
				+ "Best regards,\n"
				+ "🚀 Parking Guardian Team\n"
				+ "📩 Support: support@email.com";
		sendEmail(farmer.getEmail(), subject,message);
	}
	
}
