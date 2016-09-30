package com.robot.roboticsserver.service;

import com.robot.roboticsserver.model.CommandMessage;
import com.robot.roboticsserver.model.EngineModel;

public interface CommandMessageFactory {
    CommandMessage createEngineCommandMessage(EngineModel engineModel);
}
