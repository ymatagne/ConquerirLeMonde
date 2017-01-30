package fr.norsys.snowcamp.auth.service;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.asList;


public class SimpleUserDetailsService implements UserDetailsService {


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Map<String, String> userPassword = new HashMap<>();
        Map<String, String> userCredential = new HashMap<>();
        userPassword.put("admin", "MojitoMojitoMojito");
        userCredential.put("admin", "ADMIN");

        String password = userPassword.get(username);

        if (password == null) {
            throw new UsernameNotFoundException(String.format("No such user: %s.", username));
        }

        // Since we're using an in-memory map, when Spring erases the credentials, it
        // also gets erased from the backing map. Return a copy each time to prevent that.
        return new User(username, password,true,
                true, true,
                true, asList(new SimpleGrantedAuthority(userCredential.get(username))));
    }
}
