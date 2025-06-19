package pl.justdrinkjava.JustDrinkJava.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
    
@Getter
public abstract class BaseApplicationException extends RuntimeException {
    
    private final String errorCode;
    private final HttpStatus httpStatus;
    
    protected BaseApplicationException(String message, String errorCode, HttpStatus httpStatus) {
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }
    
    protected BaseApplicationException(String message, String errorCode, HttpStatus httpStatus, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }
} 