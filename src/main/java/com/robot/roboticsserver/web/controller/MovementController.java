package com.robot.roboticsserver.web.controller;


import com.robot.roboticsserver.web.websocket.MovementSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MovementController {

    @Autowired
    private MovementSocketHandler movementSocketHandler;

    @RequestMapping(method = RequestMethod.GET, value = "/sendCommandCode")
    public String sendCommandCode(@RequestParam(value = "commandCode") Long commandCode) {
        movementSocketHandler.sendMessageToUsers(commandCode.toString());

        return "SUCCESS";
    }

}