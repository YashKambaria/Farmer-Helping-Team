package net.engineeringdigest.journalApp.Controllers;


import lombok.extern.slf4j.Slf4j;
import net.engineeringdigest.journalApp.Entities.UserEntity;
import net.engineeringdigest.journalApp.Services.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Bank")
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
public class BankController {
	
	@Autowired
	private BankService bankService;
	
	
	@GetMapping("/getAllFarmers")
	public ResponseEntity<?> getAllFarmers(){
		try{
			return ResponseEntity.ok(bankService.getAllFarmers());
		}
		catch (Exception e){
			log.error("Error while fetching farmers",e);
			return ResponseEntity.badRequest().body("Error while fetching farmers");
		}
	}
	
	@PostMapping("/approveLoan")
	public ResponseEntity<?> approveLoan(@RequestBody UserEntity farmer){
		try{
			
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String loggedInBank = authentication.getName();
			if(loggedInBank!=null){
				bankService.approveLoan(loggedInBank,farmer);
				return new ResponseEntity<>(HttpStatus.ACCEPTED);
			}
			else{
				return ResponseEntity.badRequest().body("Bank not found");
			}
			
		}
		catch (Exception e){
			log.error("Error while approving loan",e);
			return ResponseEntity.badRequest().body("Error while approving loan");
		}
	}
}
