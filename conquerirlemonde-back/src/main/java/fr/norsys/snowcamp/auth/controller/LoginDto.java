package fr.norsys.snowcamp.auth.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {


    private String username;

    private String password;

    private Boolean rememberMe;

    @Override
    public String toString() {
        return "LoginDto{" +
            "password='*****'" +
            ", username='" + username + '\'' +
            ", rememberMe=" + rememberMe +
            '}';
    }
}
