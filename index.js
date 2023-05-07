// npm i socket.io express cors nodemon

require('dotenv').config()

const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');



app.use(cors());

app.use(express.json());


const MONGO_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

mongoose.connect(MONGO_URI).then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
}).catch((err) => {
    console.error('Error connecting to mongo: ', err)
});






const server = http.createServer(app);
const io = new Server(server,
    {
        cors:
        {
            origin: CLIENT_URL,
            methods: ["GET", "POST"]
        }
    }
);



io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join-room', (room) => {
        console.log('room joined ', room)
        socket.join(room);
    });

    socket.on('send_message', (msg, room) => {
        if (room) {
            console.log('room targeted ', room)
            socket.to(room).emit('receive-message', msg);
            // socket.broadcast.emit('receive-message', msg);
        } else {
            console.log('no room')
            socket.broadcast.emit('receive-message', msg);
        }
    });

    socket.on('start-loading', (message, room) => {
        if (room) {
            socket.to(room).emit('start-loading');
        } else {
            socket.broadcast.emit('start-loading');
        }

    });

    socket.on('stop-loading', (message, room) => {
        if (room) {
            socket.to(room).emit('stop-loading');
        } else {
            socket.broadcast.emit('stop-loading');
        }
    });
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
}
);




const chatRoutes = require('./routes/chat.routes');
app.use('/api/chats', chatRoutes);

