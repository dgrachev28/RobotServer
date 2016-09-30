package com.robot.roboticsserver.service.impl;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.robot.roboticsserver.model.CommandMessage;
import com.robot.roboticsserver.service.MovementSocketService;
import com.robot.roboticsserver.web.websocket.MovementSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovementSocketServerImpl implements MovementSocketService {

    @Autowired
    private MovementSocketHandler movementSocketHandler;

    @Override
    public void sendMessage(CommandMessage commandMessage) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        movementSocketHandler.sendMessageToUsers(gson.toJson(commandMessage));
    }
}
