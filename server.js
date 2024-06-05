// Serveur (server.js)
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('Un utilisateur est connecté');
    
    socket.on('disconnect', function() {
        console.log('Un utilisateur est déconnecté');
    });

    socket.on('chat message', function(msg) {
        console.log('Message reçu : ' + msg);
        io.emit('chat message', msg); // Envoyer le message à tous les clients connectés
    });
});

server.listen(3000, function() {
    console.log("Le serveur est en cours d'exécution sur le port 3000");
});
