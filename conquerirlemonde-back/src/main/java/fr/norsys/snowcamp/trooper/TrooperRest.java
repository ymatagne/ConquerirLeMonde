package fr.norsys.snowcamp.trooper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "*")
public class TrooperRest {

    @Autowired
    TrooperHandler shipHandler;

    @PostMapping("/trooper/launch")
    public void launchTrooper(@RequestBody Trooper trooper){
        shipHandler.sendTrooper(trooper);
    }

    @PostMapping("/trooper/drop")
    public void dropTrooper(@RequestBody Trooper trooper){
        new RestTemplate().delete("http://"+trooper.getTrooperHost()+":"+trooper.getTrooperPort()+"/die");
    }
}
