package com.robot.roboticsserver.web.controller;


import com.robot.roboticsserver.model.EngineModel;
import com.robot.roboticsserver.service.EngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MovementController {

    @Autowired
    private EngineService engineService;

    @RequestMapping(method = RequestMethod.POST, value = "/setEngineState")
    public void setEngineState(@RequestBody EngineModel engineModel) {

        engineService.setEngineState(engineModel);
    }

}