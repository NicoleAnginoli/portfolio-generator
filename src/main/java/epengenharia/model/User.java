package epengenharia.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.UniqueElements;

@Entity
@Data
@Table(name= "user", schema = "public")
public class User {

	@Id
	@NotNull
	String userName;

	@NotNull
	private String name;
	
	private String description;

	@ElementCollection
	@CollectionTable(name = "user_interests", joinColumns = @JoinColumn(name = "user_name"))
	private List<String> interests;

	@Embedded
	private Contact contacts;

	@Embedded
	@ElementCollection
	@CollectionTable(name = "user_academic_info", joinColumns = @JoinColumn(name = "user_name"))
	private List<AcademicInfo> academicInfo;

	@Embedded
	@ElementCollection
	@CollectionTable(name = "user_professional", joinColumns = @JoinColumn(name = "user_name"))
	private List<ProfessionalBackGround> professionalBackground;

	@CreationTimestamp
	private LocalDateTime createdDate;
	
	public User() { }

	public User(String userName, String name, String description, List<String> interests) {
		this.userName = userName;
		this.name = name;
		this.description = description;
		this.interests = interests;
	}
}
