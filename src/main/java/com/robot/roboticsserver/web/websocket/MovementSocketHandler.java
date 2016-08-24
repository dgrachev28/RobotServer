package com.robot.roboticsserver.web.websocket;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;

public class MovementSocketHandler extends AbstractWebSocketHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(MovementSocketHandler.class);


    private static ArrayList<WebSocketSession> users = new ArrayList<>();


    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        users.add(session);
    }


    @Override
    public void handleTransportError(WebSocketSession session, Throwable e) {
        LOGGER.info(e.getMessage(), e);
        users.remove(session);
    }


    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) {
        LOGGER.info("Connection closed. Status: " + closeStatus);
        users.remove(session);
    }


    public void sendMessageToUsers(String message) {
        for (WebSocketSession user : users) {
            try {
                if (user.isOpen()) {
                    user.sendMessage(new TextMessage(message));
                }
            } catch (IOException e) {
                LOGGER.info(e.getMessage(), e);
            }
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        System.out.println(message);
    }


}