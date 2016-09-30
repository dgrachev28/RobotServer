package com.robot.roboticsserver.model;

import java.util.List;

public class CommandMessage {
    private String command;
    /**
     * arguments can be Integer, String, Boolean
     */
    private List<Object> arguments;

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public List<Object> getArguments() {
        return arguments;
    }

    public void setArguments(List<Object> arguments) {
        this.arguments = arguments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CommandMessage that = (CommandMessage) o;

        if (command != null ? !command.equals(that.command) : that.command != null) return false;
        return arguments != null ? arguments.equals(that.arguments) : that.arguments == null;

    }

    @Override
    public int hashCode() {
        int result = command != null ? command.hashCode() : 0;
        result = 31 * result + (arguments != null ? arguments.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "CommandMessage{" +
                "command='" + command + '\'' +
                ", arguments=" + arguments +
                '}';
    }
}
