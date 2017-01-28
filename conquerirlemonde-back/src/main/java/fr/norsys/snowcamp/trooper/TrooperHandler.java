package fr.norsys.snowcamp.trooper;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;


@Component
@Slf4j
public class TrooperHandler extends TextWebSocketHandler {
    WebSocketSession session;

    public void sendTrooper(Trooper trooper) {
        log.debug("Trying to send trooper...");
        if (session != null && session.isOpen()) {
            try {
                log.debug("send trooper !");
                session.sendMessage(new TextMessage(new Gson().toJson(trooper)));
            } catch (IOException e) {
                log.debug(e.getMessage(),e);
            }
        } else {
            log.debug("Don't have open session to send trooper");
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.debug("Connection established");
        this.session = session;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {
        if ("CLOSE".equalsIgnoreCase(message.getPayload())) {
            session.close();
        } else {
            log.debug("Received:" + message.getPayload());
        }
    }
}
