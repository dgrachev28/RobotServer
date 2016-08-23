package com.robot.roboticsserver.configuration;

import com.robot.roboticsserver.web.websocket.MovementSocketHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(movementHandler(), "/");
    }

    @Bean
    public MovementSocketHandler movementHandler() {
        return new MovementSocketHandler();
    }

}