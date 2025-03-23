package net.engineeringdigest.journalApp.Services;


import lombok.extern.slf4j.Slf4j;
import net.engineeringdigest.journalApp.Entities.BankEntity;
import net.engineeringdigest.journalApp.Entities.UserEntity;
import net.engineeringdigest.journalApp.Repositories.BankRepositary;
import net.engineeringdigest.journalApp.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
public class BankService {
	
	@Autowired
	private BankRepositary bankRepositary;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	public PasswordEncoder passwordEncoder;
	
	
	
	public List<UserEntity> getAllFarmers() {
		try{
			List<UserEntity> all = userRepository.findAll();
			return all;
		}
		catch (Exception e){
			log.error("Error while finding farmers  .......",e);
			throw e;
		}
	}
	
	public void approveLoan(String loggedInBank, UserEntity farmer) {
		try {
			BankEntity currBank = bankRepositary.findByBankName(loggedInBank);
			List<UserEntity> loansApproved = currBank.getLoansApproved();
			farmer.setLoanApproved(true);
			loansApproved.add(farmer);
			List<String> BanksAdded=farmer.getHistory();
			BanksAdded.add(loggedInBank);
			emailService.sendAlert(farmer,loggedInBank);
		}
		catch (Exception e){
			throw e;
		}
	}
	
	public boolean saveUser(BankEntity bankEntity) {
		try{
			bankEntity.setBankCredentials(passwordEncoder.encode(bankEntity.getBankCredentials()));
			bankEntity.setRoles(Arrays.asList("BANK"));
			bankRepositary.save(bankEntity);
			return true;
		}
		catch (Exception e){
			log.error("error while saving user",e);
			return false;
		}
		
	}
}
