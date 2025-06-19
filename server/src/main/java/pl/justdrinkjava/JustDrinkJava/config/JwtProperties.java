package pl.justdrinkjava.JustDrinkJava.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Data
@Validated
@ConfigurationProperties(prefix = "app.jwt")
public class JwtProperties {
    
    @NotBlank(message = "JWT secret cannot be blank")
    private String secret;
    
    @Positive(message = "JWT expiration must be positive")
    private long expiration = 3600000;
    
    private String issuer = "justdrinkjava";
    
    @Positive(message = "Refresh token expiration must be positive")
    private long refreshExpiration = 604800000;
} 