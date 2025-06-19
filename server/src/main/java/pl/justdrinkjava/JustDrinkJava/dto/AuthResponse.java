package pl.justdrinkjava.JustDrinkJava.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponse extends BaseResponse {
    
    private String token;
    @Builder.Default
    private String type = "Bearer";
    private UserDto user;
    private Long expiresIn;
    
    public AuthResponse(String token, UserDto user) {
        super("success", "Uwierzytelnienie zakończone sukcesem");
        this.token = token;
        this.user = user;
        this.type = "Bearer";
    }
} 