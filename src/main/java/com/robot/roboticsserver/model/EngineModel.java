package com.robot.roboticsserver.model;


public class EngineModel {

    private EngineType type;
    private EngineDirection direction;
    private Long speed;

    public EngineType getType() {
        return type;
    }

    public void setType(EngineType type) {
        this.type = type;
    }

    public EngineDirection getDirection() {
        return direction;
    }

    public void setDirection(EngineDirection direction) {
        this.direction = direction;
    }

    public Long getSpeed() {
        return speed;
    }

    public void setSpeed(Long speed) {
        this.speed = speed;
    }
}
