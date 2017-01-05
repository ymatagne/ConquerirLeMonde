package fr.norsys.snowcamp;

import fr.norsys.snowcamp.planets.PlanetsHandler;
import fr.norsys.snowcamp.ship.ShipHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
@EnableScheduling
public class WebSocketConfig implements WebSocketConfigurer {
    @Autowired
    PlanetsHandler planetsHandler;

    @Autowired
    ShipHandler shipHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(planetsHandler, "/ws/planets")
                .addHandler(shipHandler,"/ws/ships")
                .setAllowedOrigins("*");
    }


}
