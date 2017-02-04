package fr.norsys.snowcamp.planets;

import com.google.gson.Gson;
import fr.norsys.snowcamp.KubernetesClientWrapper;
import fr.norsys.snowcamp.trooper.Trooper;
import lombok.extern.slf4j.Slf4j;
import mousio.etcd4j.EtcdClient;
import mousio.etcd4j.responses.EtcdAuthenticationException;
import mousio.etcd4j.responses.EtcdException;
import mousio.etcd4j.responses.EtcdKeysResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collector;
import java.util.stream.Collectors;

/**
 * Created by luya on 30/12/16.
 */
@Component
@Slf4j
public class PlanetsService {
    private AtomicInteger counter = new AtomicInteger(0);

    @Value("${etcdUri}")
    String etcdUri;

    @Autowired
    PlanetsFleetHandler planetsFleetHandler;

    @Autowired
    PlanetsKubernetesHandler planetsKubernetesHandler;

    @Autowired
    KubernetesClientWrapper kubernetes;

    EtcdClient etcd;

    PlanetsService(){
        this.etcd = new EtcdClient(URI.create(etcdUri));
    }
    List<Planet> planets;


    private void connectEtcd() {
        if (etcd == null) {
            etcd = new EtcdClient(URI.create(etcdUri));
        }
    }

    @Scheduled(fixedDelay = 1000)
    public void sendPlanetsWithKubernetes() throws IOException, EtcdAuthenticationException, TimeoutException, EtcdException {
        planetsKubernetesHandler.sendPlanets(kubernetes.planets());
    }
        @Scheduled(fixedDelay = 1000)
    public void sendPlanetsWithFleet() throws IOException, EtcdAuthenticationException, TimeoutException, EtcdException {
        connectEtcd();

        List<Planet> planets = new ArrayList<>();


        try {
            EtcdKeysResponse response = etcd.getDir("/_coreos.com/fleet/machines/").recursive().send().get();
            planets = response.node.nodes.stream().filter(p -> p != null && p.nodes.size() > 0).map(m -> decodePlanet(m)).sorted((planet1, planet2) -> planet1.getName().compareTo(planet2.getName())).collect(Collectors.toList());

        } catch (IOException | EtcdAuthenticationException | TimeoutException | EtcdException e) {
            log.debug("erreur");
        }

        if (planets.size()>0) {

            try {
                EtcdKeysResponse response = etcd.get("/_coreos.com/fleet/state").recursive().send().get();
                List<Trooper> troopers = response.node.nodes.stream().filter(n -> Boolean.TRUE.equals(n.key.matches("/_coreos.com/fleet/state/.*.service"))).map(n -> decodeTrooper(n.value, n.key)).collect(Collectors.toList());

                for (Planet planet : planets) {
                    planet.setTroopers(troopers.stream().filter(trooper -> trooper.getPlanet().getId().equals(planet.getId())).collect(Collectors.toList()));
                }
            }catch (EtcdException exception){
                log.error(exception.getMessage());
            }

        }

        planetsFleetHandler.sendPlanets(planets);
    }

    private Trooper decodeTrooper(String value, String key) {
            Docker docker = new Gson().fromJson(value, Docker.class);
            String [] name = key.split("/");
            Trooper trooper = new Trooper("","","",name[name.length-1],new Planet(docker.getMachineState().getID(),"null",docker.getMachineState().getPublicIP(), new ArrayList<>()));
            return trooper;
    }


    private Planet decodePlanet(EtcdKeysResponse.EtcdNode node) {
            if (node.nodes.size() > 0) {
                Machine machine= new Gson().fromJson(node.nodes.get(0).value, Machine.class);
                return new Planet(machine.getID(),machine.getMetadata().getHostname(),machine.getPublicIP(), new ArrayList<>());
            }
        return null;
    }
}
