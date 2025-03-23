package net.engineeringdigest.journalApp.Entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "BANKS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BankEntity {
	
	@Id
	private ObjectId id;
	@NonNull
	private String bankName;
	@NonNull
	private String bankCredentials;
	@DBRef
	private List<UserEntity> loansApproved=new ArrayList<>();
	private List<String> roles;
	
}
