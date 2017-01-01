package fr.norsys.snowcamp;

import fr.norsys.snowcamp.planets.Planet;
import io.fabric8.kubernetes.api.model.Node;
import io.fabric8.kubernetes.client.Config;
import io.fabric8.kubernetes.client.ConfigBuilder;
import io.fabric8.kubernetes.client.DefaultKubernetesClient;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Component
public class KubernetesClientWrapper {

    KubernetesClient client;

    KubernetesClientWrapper(){
        Config config = new ConfigBuilder()
                .withMasterUrl("https://172.17.4.99")
                .withCaCertFile("/Users/luya/Workspace/coreos-kubernetes/single-node/ssl/ca.pem")
                .withClientCertFile("/Users/luya/Workspace/coreos-kubernetes/single-node/ssl/admin.pem")
                .withClientKeyFile("/Users/luya/Workspace/coreos-kubernetes/single-node/ssl/admin-key.pem")
                .build();
        client = new DefaultKubernetesClient(config);
    }

    public List<Planet> planets(){
        return client.nodes().list().getItems().stream().map(node -> createPlanet(node)).collect(Collectors.toList());
    }

    private Planet createPlanet(Node node) {
        List<Trooper> troopers = new ArrayList<>();
        node.getStatus().getImages().forEach(container -> troopers.add(new Trooper(container.getNames().get(1))));
        return new Planet(node.getMetadata().getUid(),node.getMetadata().getName(),node.getStatus().getAddresses().get(0).getAddress(),troopers);
    }
}
