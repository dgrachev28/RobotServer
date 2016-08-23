package com.robot.roboticsserver.web.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MovementController {

    @RequestMapping(method = RequestMethod.GET, value = "/sendCommandCode")
    public String sendCommandCode(@RequestParam(value = "commandCode") Long commandCode) {
        System.out.println(commandCode);
        return "SUCCESS";
    }


}