package epengenharia.model;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class AcademicInfo {
    String institution;
    String startDate;
    String endDate;
    String course;
}
