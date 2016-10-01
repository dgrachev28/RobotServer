$(document).ready(function () {

    var classes = {
        activeKey: "movement-control-panel__key_active"
    };

    var constants = {
        LEFT_ARROW_KEY_CODE: 37,
        UP_ARROW_KEY_CODE: 38,
        RIGHT_ARROW_KEY_CODE: 39,
        DOWN_ARROW_KEY_CODE: 40
    };

    var isUpKeyDown,
        isLeftKeyDown,
        isDownKeyDown,
        isRightKeyDown,
        previousLeftEngineMessage,
        previousRightEngineMessage;


    function initVars() {
        isUpKeyDown = false;
        isLeftKeyDown = false;
        isDownKeyDown = false;
        isRightKeyDown = false;
    }

    function bindEvents() {
        $(".jsUpKeyMovementControl")
            .on("mousedown", function() {
                isUpKeyDown = true;
                sendMessagesToRobot();
            })
            .on("mouseup", function() {
                isUpKeyDown = false;
                sendMessagesToRobot();
            });
        $(".jsLeftKeyMovementControl")
            .on("mousedown", function() {
                isLeftKeyDown = true;
                sendMessagesToRobot();
            })
            .on("mouseup", function() {
                isLeftKeyDown = false;
                sendMessagesToRobot();
            });
        $(".jsDownKeyMovementControl")
            .on("mousedown", function() {
                isDownKeyDown = true;
                sendMessagesToRobot();
            })
            .on("mouseup", function() {
                isDownKeyDown = false;
                sendMessagesToRobot();
            });
        $(".jsRightKeyMovementControl")
            .on("mousedown", function() {
                isRightKeyDown = true;
                sendMessagesToRobot();
            })
            .on("mouseup", function() {
                isRightKeyDown = false;
                sendMessagesToRobot();
            });

        $(document).keydown(onKeyDownEventHandler);
        $(document).keyup(onKeyUpEventHandler);
    }

    function init() {
        initVars();
        bindEvents();
    }


    /* Handlers */
    function onKeyDownEventHandler(event) {
        switch(event.keyCode) {
            case constants.UP_ARROW_KEY_CODE: {
                isUpKeyDown = true;
                $(".jsUpKeyMovementControl").addClass(classes.activeKey);
                break;
            }
            case constants.LEFT_ARROW_KEY_CODE: {
                isLeftKeyDown = true;
                $(".jsLeftKeyMovementControl").addClass(classes.activeKey);
                break;
            }
            case constants.DOWN_ARROW_KEY_CODE: {
                isDownKeyDown = true;
                $(".jsDownKeyMovementControl").addClass(classes.activeKey);
                break;
            }
            case constants.RIGHT_ARROW_KEY_CODE: {
                isRightKeyDown = true;
                $(".jsRightKeyMovementControl").addClass(classes.activeKey);
                break;
            }
        }
        sendMessagesToRobot();
    }



    function onKeyUpEventHandler(event) {
        switch(event.keyCode) {
            case constants.UP_ARROW_KEY_CODE: {
                isUpKeyDown = false;
                $(".jsUpKeyMovementControl").removeClass(classes.activeKey);
                break;
            }
            case constants.LEFT_ARROW_KEY_CODE: {
                isLeftKeyDown = false;
                $(".jsLeftKeyMovementControl").removeClass(classes.activeKey);
                break;
            }
            case constants.DOWN_ARROW_KEY_CODE: {
                isDownKeyDown = false;
                $(".jsDownKeyMovementControl").removeClass(classes.activeKey);
                break;
            }
            case constants.RIGHT_ARROW_KEY_CODE: {
                isRightKeyDown = false;
                $(".jsRightKeyMovementControl").removeClass(classes.activeKey);
                break;
            }
        }
        sendMessagesToRobot();
    }
    


    function sendMessagesToRobot() {
        var leftEngineMessage = null,
            rightEngineMessage = null;

        // stop
        if (!isUpKeyDown && !isDownKeyDown && !isLeftKeyDown && !isRightKeyDown) {
            leftEngineMessage = {direction: "FORWARD", speed: 0};
            rightEngineMessage = {direction: "FORWARD", speed: 0};
        }

        // turn right
        if (!isUpKeyDown && !isDownKeyDown && !isLeftKeyDown && isRightKeyDown) {
            leftEngineMessage = {direction: "FORWARD", speed: 255};
            rightEngineMessage = {direction: "BACKWARD", speed: 255};
        }

        // turn left
        if (!isUpKeyDown && !isDownKeyDown && isLeftKeyDown && !isRightKeyDown) {
            leftEngineMessage = {direction: "BACKWARD", speed: 255};
            rightEngineMessage = {direction: "FORWARD", speed: 255};
        }

        // forward
        if (isUpKeyDown && !isDownKeyDown && !isLeftKeyDown && !isRightKeyDown) {
            leftEngineMessage = {direction: "FORWARD", speed: 255};
            rightEngineMessage = {direction: "FORWARD", speed: 255};
        }

        // forward right
        if (isUpKeyDown && !isDownKeyDown && !isLeftKeyDown && isRightKeyDown) {
            leftEngineMessage = {direction: "FORWARD", speed: 255};
            rightEngineMessage = {direction: "FORWARD", speed: 200};
        }

        // forward left
        if (isUpKeyDown && !isDownKeyDown && isLeftKeyDown && !isRightKeyDown) {
            leftEngineMessage = {direction: "FORWARD", speed: 200};
            rightEngineMessage = {direction: "FORWARD", speed: 255};
        }

        // backward
        if (!isUpKeyDown && isDownKeyDown && !isLeftKeyDown && !isRightKeyDown) {
            leftEngineMessage = {direction: "BACKWARD", speed: 255};
            rightEngineMessage = {direction: "BACKWARD", speed: 255};
        }

        // backward right
        if (!isUpKeyDown && isDownKeyDown && !isLeftKeyDown && isRightKeyDown) {
            leftEngineMessage = {direction: "BACKWARD", speed: 255};
            rightEngineMessage = {direction: "BACKWARD", speed: 200};
        }

        // backward left
        if (!isUpKeyDown && isDownKeyDown && isLeftKeyDown && !isRightKeyDown) {
            leftEngineMessage = {direction: "BACKWARD", speed: 200};
            rightEngineMessage = {direction: "BACKWARD", speed: 255};
        }



        if (leftEngineMessage && rightEngineMessage) {
            leftEngineMessage.type = "LEFT_ENGINE";
            rightEngineMessage.type = "RIGHT_ENGINE";

            if (!(previousLeftEngineMessage && previousRightEngineMessage &&
                equalMessages(previousLeftEngineMessage, leftEngineMessage) &&
                equalMessages(previousRightEngineMessage, rightEngineMessage))) {

                $.ajax({
                    method: 'POST',
                    url: '/setEngineState',
                    contentType: "application/json",
                    data: JSON.stringify(leftEngineMessage)
                });

                $.ajax({
                    method: 'POST',
                    url: '/setEngineState',
                    contentType: "application/json",
                    data: JSON.stringify(rightEngineMessage)
                });


                previousLeftEngineMessage = leftEngineMessage;
                previousRightEngineMessage = rightEngineMessage;
            }
        }
    }



    function equalMessages(m1, m2) {
        if (m1 && m2) {
            return (m1.type === m2.type && m1.direction === m2.direction && m1.speed === m2.speed);
        }
        return false;
    }

    init();

});