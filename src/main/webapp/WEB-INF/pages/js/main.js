$(document).ready(function () {

    var classes = {
        controlButton: "jsControlButton",
        numberInput: "jsCommandCode"
    };

    var controlButton,
        numberInput;

    function initVars() {
        controlButton = $("." + classes.controlButton);
        numberInput = $("." + classes.numberInput);
    }

    function bindEvents() {
        controlButton.on("click", sendMessageToRobot);
    }

    function init() {
        initVars();
        bindEvents();
    }


    /* Handlers */
    function sendMessageToRobot() {
        var data = {
            type: "LEFT_ENGINE",
            direction: "FORWARD",
            speed: 3
        };

        $.ajax({
            method: 'POST',
            url: '/setEngineState',
            contentType: "application/json",
            data: JSON.stringify(data)
        });
    }

    init();

});