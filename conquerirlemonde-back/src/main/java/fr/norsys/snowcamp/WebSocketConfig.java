package fr.norsys.snowcamp;

import fr.norsys.snowcamp.planets.PlanetsFleetHandler;
import fr.norsys.snowcamp.planets.PlanetsKubernetesHandler;
import fr.norsys.snowcamp.trooper.TrooperCountHandler;
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
    PlanetsKubernetesHandler planetsKubernetesHandler;

    @Autowired
    PlanetsFleetHandler planetsFleetHandler;

    @Autowired
    TrooperHandler trooperHandler;

    @Autowired
    TrooperCountHandler trooperCountHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(planetsKubernetesHandler, "/ws/planets/kubernetes")
                .addHandler(planetsFleetHandler, "/ws/planets/fleet")
                .addHandler(trooperHandler,"/ws/trooper")
                .addHandler(trooperCountHandler,"/ws/trooper/count")
                .setAllowedOrigins("*");
    }


}
