package fr.norsys.snowcamp.auth.jwt;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * Object to return as body in JWT Authentication.
 */
public class JWTToken {

    @Getter
    @Setter
    @JsonProperty("id_token")
    private String idToken;

    public JWTToken(String idToken) {
        this.idToken = idToken;
    }

}
