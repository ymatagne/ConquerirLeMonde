package fr.norsys.snowcamp;

import fr.norsys.snowcamp.planets.PlanetsHandler;
import fr.norsys.snowcamp.trooper.TrooperHandler;
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
    TrooperHandler trooperHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(planetsHandler, "/ws/planets")
                .addHandler(trooperHandler,"/ws/trooper")
                .setAllowedOrigins("*");
    }


}
