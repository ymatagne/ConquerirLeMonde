package fr.norsys.snowcamp.planets;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Machine {
    public String ID;
    public String PublicIP;
    public String Version;
    public Metadata Metadata;
}