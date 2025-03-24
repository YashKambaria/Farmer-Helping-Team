package net.engineeringdigest.journalApp.Services;

import net.engineeringdigest.journalApp.Entities.BankEntity;
import net.engineeringdigest.journalApp.Repositories.BankRepositary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("bankDetailsServiceImpl")
public class BankDetailsServiceImpl implements BankDetailsService {

    @Autowired
    private BankRepositary bankRepository;

    @Override
    public UserDetails loadUserByUsername(String bankName) throws UsernameNotFoundException {
        BankEntity bank = bankRepository.findByBankName(bankName);
        if (bank != null) {
            UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                    .username(bank.getBankName())
                    .password(bank.getBankCredentials())
                    .roles(bank.getRoles().toArray(new String[0]))
                    .build();
            return userDetails;
        }
        throw new UsernameNotFoundException("Bank not found with name: " + bankName);
    }
}