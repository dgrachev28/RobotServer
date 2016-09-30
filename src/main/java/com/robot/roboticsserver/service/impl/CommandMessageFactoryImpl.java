package com.robot.roboticsserver.service.impl;

import com.robot.roboticsserver.model.CommandMessage;
import com.robot.roboticsserver.model.EngineDirection;
import com.robot.roboticsserver.model.EngineModel;
import com.robot.roboticsserver.model.EngineType;
import com.robot.roboticsserver.service.CommandMessageFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommandMessageFactoryImpl implements CommandMessageFactory{

    private static final Logger LOGGER = LoggerFactory.getLogger(CommandMessageFactoryImpl.class);

    @Override
    public CommandMessage createEngineCommandMessage(EngineModel engineModel) {
        CommandMessage commandMessage = new CommandMessage();
        commandMessage.setCommand(getCommand(engineModel));
        commandMessage.setArguments(getArguments(engineModel));
        return commandMessage;
    }

    private String getCommand(EngineModel engineModel) {
        if (engineModel.getType() == EngineType.LEFT_ENGINE) {
            return "setLeftEngineState";
        } else if (engineModel.getType() == EngineType.RIGHT_ENGINE) {
            return "setRightEngineState";
        } else {
            LOGGER.error("Engine has unknowable type: " + engineModel.getType());
            throw new IllegalArgumentException("Engine has unknowable type: " + engineModel.getType());
        }
    }

    private List<Object> getArguments(EngineModel engineModel) {
        List<Object> arguments = new ArrayList<>();
        Boolean isForwardDirection = engineModel.getDirection() == EngineDirection.FORWARD;
        arguments.add(isForwardDirection);
        arguments.add(engineModel.getSpeed());
        return arguments;
    }
}