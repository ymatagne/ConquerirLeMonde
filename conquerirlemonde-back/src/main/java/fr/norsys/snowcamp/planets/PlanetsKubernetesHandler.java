package fr.norsys.snowcamp.planets;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;


@Component
@Slf4j
public class PlanetsKubernetesHandler extends TextWebSocketHandler {
    WebSocketSession session;

    public void sendPlanets(List<Planet> planets) {
        log.info("Trying to send planets...");
        if (session != null && session.isOpen()) {
            try {
                log.info("send planets !");
                session.sendMessage(new TextMessage(new Gson().toJson(planets)));
            } catch (IOException e) {
                log.error(e.getMessage(),e);
            }
        } else {
            log.info("Don't have open session to send planets");
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("Connection established");
        this.session = session;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {
        if ("CLOSE".equalsIgnoreCase(message.getPayload())) {
            session.close();
        } else {
            log.info("Received:" + message.getPayload());
        }
    }
}
