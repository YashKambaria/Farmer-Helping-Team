package net.engineeringdigest.journalApp.Repositories;



import net.engineeringdigest.journalApp.Entities.BankEntity;
import net.engineeringdigest.journalApp.Entities.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface BankRepositary extends MongoRepository<BankEntity, ObjectId> {
	BankEntity findByBankName(String BankName);
}