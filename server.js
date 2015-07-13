/**
 * Created by yokmama on 15/07/04.
 */
var ws = require('websocket.io');
var server = ws.listen(8888, function () {
    console.log('\033[96m Server listening port 8888 \033[39m');
});

server.on('connection', function(socket) {
    console.log("client connected")
    socket.on('message', function(data) {
        var data = JSON.parse(data);
        data.time = Date.now();
        data = JSON.stringify(data);
        console.log('\033[96m' + data + '\033[39m');

        //socket.emit(data);
        server.clients.forEach(function(client) {
            if (client!=null && client != socket) {
                client.send(data);
            }
        });
    });
    socket.on('disconnect', function() {
        console.log("client disconnected")
    });
});

