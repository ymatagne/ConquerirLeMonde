package fr.norsys.snowcamp.trooper;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
public class TrooperRest {

    @Autowired
    TrooperHandler shipHandler;

    @PostMapping("/trooper/launch")
    public void launchTrooper(@RequestBody Trooper trooper){
        log.info("Launch "+trooper.getName()+" start : " + trooper.getTrooperHost());
        shipHandler.sendTrooper(trooper);
    }

    @PostMapping("/trooper/die")
    public boolean dropTrooper(@RequestBody Trooper trooper){
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate=new RestTemplate();
        try {
            ResponseEntity<String> response = restTemplate.postForEntity("http://" + trooper.getTrooperHost() + ":" + trooper.getTrooperPort() + "/die", null, String.class);
            log.info("Delete "+trooper.getName()+" start : " + trooper.getTrooperHost()+" code return "+ response.getStatusCode().is2xxSuccessful());
            return response.getStatusCode().is2xxSuccessful();
        }catch(Throwable exception){
            log.info("Delete "+trooper.getName()+" start : " + trooper.getTrooperHost()+" code returne error ",exception);
            return false;
        }
    }
}
