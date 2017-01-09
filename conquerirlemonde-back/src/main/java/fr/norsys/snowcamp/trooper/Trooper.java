package fr.norsys.snowcamp.trooper;

import fr.norsys.snowcamp.planets.Planet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Trooper {
    private String image;
    private String url;
    private String name;
    private Planet planet;
}
