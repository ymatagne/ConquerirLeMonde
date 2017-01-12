package fr.norsys.snowcamp.trooper;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty
    private String trooperHost;
    @JsonProperty
    private String trooperPort;
    @JsonProperty
    private String image;
    @JsonProperty
    private String name;
    @JsonIgnore
    private Planet planet;
}
