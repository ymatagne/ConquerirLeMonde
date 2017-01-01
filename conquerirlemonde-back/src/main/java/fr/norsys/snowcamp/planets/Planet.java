package fr.norsys.snowcamp.planets;

import fr.norsys.snowcamp.Trooper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

/**
 * Created by luya on 30/12/16.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Planet {
    private String id;
    private String name;
    private String ip;
    private List<Trooper> troopers;
}
