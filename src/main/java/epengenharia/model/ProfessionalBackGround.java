package epengenharia.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Data
@Embeddable
public class ProfessionalBackGround {
    String company;
    String role;
    String startDate;
    String endDate;
    @Column(length = 65535)
    String roleDescription;
    Boolean isCurrentlyJob;
}