package pl.justdrinkjava.JustDrinkJava.exception;

import org.springframework.http.HttpStatus;

public class UserAlreadyExistsException extends BaseApplicationException {
    
    private static final String ERROR_CODE = "USER_ALREADY_EXISTS";
    
    public UserAlreadyExistsException(String message) {
        super(message, ERROR_CODE, HttpStatus.CONFLICT);
    }
    
    public UserAlreadyExistsException(String email, Throwable cause) {
        super("Użytkownik z emailem " + email + " już istnieje", ERROR_CODE, HttpStatus.CONFLICT, cause);
    }
} 