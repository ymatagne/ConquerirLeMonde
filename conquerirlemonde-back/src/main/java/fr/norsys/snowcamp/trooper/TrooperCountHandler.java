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
public class TrooperCountHandler extends TextWebSocketHandler {
    WebSocketSession session;
    private int count = 0;

    public void add() {
        count = count+1;

        log.debug("Trying to send trooper count...");
        if (session != null && session.isOpen()) {
            try {
                log.debug("send trooper  count!");
                session.sendMessage(new TextMessage(""+count));
            } catch (IOException e) {
                log.debug(e.getMessage(),e);
            }
        } else {
            log.debug("Don't have open session to send trooper count");
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
