package com.robot.roboticsserver.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"com.robot.roboticsserver.configuration", "com.robot.roboticsserver.service"})
public class RootConfig {
}
