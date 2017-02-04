package fr.norsys.snowcamp;

import fr.norsys.snowcamp.planets.Planet;
import fr.norsys.snowcamp.trooper.Trooper;
import io.fabric8.kubernetes.api.model.Node;
import io.fabric8.kubernetes.client.Config;
import io.fabric8.kubernetes.client.ConfigBuilder;
import io.fabric8.kubernetes.client.DefaultKubernetesClient;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Component;

import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Component
public class KubernetesClientWrapper {

    KubernetesClient client;

    KubernetesClientWrapper() throws URISyntaxException {
        Config config = new ConfigBuilder()
                .withMasterUrl("https://172.20.21.123:443")
                .withCaCertFile("/Users/luya/Workspace/conquerirlemonde/conquerirlemonde-vagrant/episode5/queenbee/certificats/ca.pem")
                .withClientCertFile("/Users/luya/Workspace/conquerirlemonde/conquerirlemonde-vagrant/episode5/queenbee/certificats/admin.pem")
                .withClientKeyFile("/Users/luya/Workspace/conquerirlemonde/conquerirlemonde-vagrant/episode5/queenbee/certificats/admin-key.pem")
                .build();
        client = new DefaultKubernetesClient(config);
    }

    public List<Planet> planets(){
        return client.nodes().list().getItems().stream().map(node -> createPlanet(node)).collect(Collectors.toList());
    }

    private Planet createPlanet(Node node) {
        List<Trooper> troopers = new ArrayList<>();
        client.pods().list().getItems().stream().filter(pod-> pod.getSpec().getNodeName() != null).filter(pod -> pod.getSpec().getNodeName().equals(node.getMetadata().getName()) ).forEach(pod -> troopers.add(new Trooper(node.getMetadata().getName(),"",pod.getSpec().getContainers().get(0).getImage(),node.getMetadata().getName(),null)));
        return new Planet(node.getMetadata().getUid(),node.getMetadata().getName(),node.getStatus().getAddresses().get(0).getAddress(),troopers);
    }
}
