package fr.norsys.snowcamp.ship;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ShipRest {

    @Autowired
    ShipHandler shipHandler;

    @PostMapping("/new")
    public void newShip(@RequestBody Ship ship){
        shipHandler.sendShip(ship);
    }

    @PostMapping("/dead")
    public void deadShip(@RequestBody Ship ship){
        new RestTemplate().delete(ship.getIp());
    }
}
