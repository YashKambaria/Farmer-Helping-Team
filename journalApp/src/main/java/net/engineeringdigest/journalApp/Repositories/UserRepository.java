package net.engineeringdigest.journalApp.Repositories;



import net.engineeringdigest.journalApp.Entities.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserEntity, ObjectId>{
	UserEntity findUserByPhoneNo(String phoneNo);
	UserEntity findUserByEmail(String email);
	UserEntity findByName(String name);
	boolean existsByName(String username);
	boolean existsByEmail(String name);
	boolean existsByPhoneNo(String phoneNo);
	void deleteByName(String name);
	
}
