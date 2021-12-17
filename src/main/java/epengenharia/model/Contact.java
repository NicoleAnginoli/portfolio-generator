package epengenharia.model;

import lombok.Data;
import javax.persistence.Embeddable;

@Data
@Embeddable
public class Contact {

    String linkedin;
    String email;
    String phone;
}
