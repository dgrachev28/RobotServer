$(document).ready(function () {

    var classes = {
        controlButton: "jsControlButton",
        openSocketButton: "jsOpenSocketButton",
        sendSocketButton: "jsSendSocketButton",
        closeSocketButton: "jsCloseSocketButton",
        numberInput: "jsCommandCode"
    };

    var controlButton,
        openSocketButton,
        sendSocketButton,
        closeSocketButton,
        numberInput;

    var sock;

    function initVars() {
        controlButton = $("." + classes.controlButton);
        openSocketButton = $("." + classes.openSocketButton);
        sendSocketButton = $("." + classes.sendSocketButton);
        closeSocketButton = $("." + classes.closeSocketButton);
        numberInput = $("." + classes.numberInput);
    }

    function bindEvents() {
        controlButton.on("click", sendMessageToRobot);
        openSocketButton.on("click", openSocket);
        sendSocketButton.on("click", sendSocket);
        closeSocketButton.on("click", closeSocket);
    }

    function initWebSocket() {
        var url = 'ws://localhost:8080/websocket';
        sock =  new WebSocket(url);
        // sock = new SockJS('http://');
        sock.onopen = function() {
            console.log('open');
        };
        sock.onmessage = function(e) {
            console.log('message', e.data);
        };
        sock.onclose = function() {
            console.log('close');
        };

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

    function openSocket() {
        sock.open();
    }
    function sendSocket() {
        sock.send('test');
    }
    function closeSocket() {
        sock.close();
    }


    init();

});