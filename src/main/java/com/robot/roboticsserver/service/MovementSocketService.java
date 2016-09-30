package com.robot.roboticsserver.service;

import com.robot.roboticsserver.model.CommandMessage;

public interface MovementSocketService {
    void sendMessage(CommandMessage commandMessage);
}
