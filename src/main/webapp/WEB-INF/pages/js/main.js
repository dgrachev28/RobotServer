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
        $.ajax({
            method: 'GET',
            url: '/sendCommandCode',
            // accepts: "application/json; charset=utf-8",
            data: {
                commandCode: numberInput.val()
            }
        });
    }

    init();

});