package fr.norsys.snowcamp.planets;

import fr.norsys.snowcamp.KubernetesClientWrapper;
import fr.norsys.snowcamp.planets.PlanetsHandler;
import io.fabric8.kubernetes.client.Config;
import io.fabric8.kubernetes.client.ConfigBuilder;
import io.fabric8.kubernetes.client.DefaultKubernetesClient;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by luya on 30/12/16.
 */
@Component
public class PlanetsService {
    private AtomicInteger counter = new AtomicInteger(0);

    @Autowired
    PlanetsHandler planetsHandler;

    @Autowired
    KubernetesClientWrapper kubernetes;


    List<Planet> planets;

    @Scheduled(fixedDelay = 1000)
    public void sendPlanets() {
        planetsHandler.sendPlanets(kubernetes.planets());
    }
}
