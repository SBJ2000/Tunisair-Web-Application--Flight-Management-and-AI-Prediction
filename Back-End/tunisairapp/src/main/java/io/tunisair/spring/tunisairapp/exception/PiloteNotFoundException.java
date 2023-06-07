package io.tunisair.spring.tunisairapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PiloteNotFoundException extends RuntimeException {

    public PiloteNotFoundException(String message) {
        super(message);
    }
}
