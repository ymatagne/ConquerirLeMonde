package fr.norsys.snowcamp.ship;

import com.google.gson.Gson;
import fr.norsys.snowcamp.planets.Planet;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;


@Component
@Slf4j
public class ShipHandler extends TextWebSocketHandler {
    WebSocketSession session;

    public void sendShip(Ship ship) {
        log.info("Trying to send ship...");
        if (session != null && session.isOpen()) {
            try {
                log.info("send ship !");
                session.sendMessage(new TextMessage(new Gson().toJson(ship)));
            } catch (IOException e) {
                log.error(e.getMessage(),e);
            }
        } else {
            log.info("Don't have open session to send ship");
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
