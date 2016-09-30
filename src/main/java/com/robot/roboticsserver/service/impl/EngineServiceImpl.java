package com.robot.roboticsserver.service.impl;

import com.robot.roboticsserver.model.CommandMessage;
import com.robot.roboticsserver.model.EngineModel;
import com.robot.roboticsserver.service.CommandMessageFactory;
import com.robot.roboticsserver.service.EngineService;
import com.robot.roboticsserver.service.MovementSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EngineServiceImpl implements EngineService{

    @Autowired
    private MovementSocketService movementSocketService;
    @Autowired
    private CommandMessageFactory commandMessageFactory;

    public void setEngineState(EngineModel engineModel) {
        CommandMessage commandMessage = commandMessageFactory.createEngineCommandMessage(engineModel);
        movementSocketService.sendMessage(commandMessage);
    }

}
