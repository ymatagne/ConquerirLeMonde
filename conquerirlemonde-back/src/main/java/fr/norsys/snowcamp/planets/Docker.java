package fr.norsys.snowcamp.planets;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Docker {
    public String loadState;
    public String loaded;
    public String activeState;
    public String subState;
    public Machine machineState;
    public String unitHash;
    public String port;
}
