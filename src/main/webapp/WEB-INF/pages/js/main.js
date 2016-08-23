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

    function initWebSocket() {
        var url = 'ws://localhost:8080';
        var sock = new WebSocket(url);
        sock.onopen = function() {
            console.log('Opening');
            sayMarco();
        };
        sock.onmessage = function(e) {
            console.log('Received message: ', e.data);
            setTimeout(function(){sayMarco()}, 2000);
        };
        sock.onclose = function() {
            console.log('Closing');
        };
        function sayMarco() {
            console.log('Sending Marco!');
            sock.send("Marco!");
        }

    }

    function init() {
        initVars();
        bindEvents();
        initWebSocket();
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