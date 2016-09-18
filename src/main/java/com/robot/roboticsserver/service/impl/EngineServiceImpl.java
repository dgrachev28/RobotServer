package com.robot.roboticsserver.service.impl;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.robot.roboticsserver.model.EngineModel;
import com.robot.roboticsserver.service.EngineService;
import com.robot.roboticsserver.web.websocket.MovementSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EngineServiceImpl implements EngineService{

    @Autowired
    private MovementSocketHandler movementSocketHandler;

    public void setEngineState(EngineModel engineModel) {
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        movementSocketHandler.sendMessageToUsers(gson.toJson(engineModel));
    }

}
