const express = require('express')
const app = express()
const http = require("http");
const expressServer = http.createServer(app)
const port = process.env.PORT || 5000;

require('dotenv').config()

const { Server } = require("socket.io")
const io = new Server(expressServer);

io.on("connection", (socket)=>{
    console.log("New User Connected!");

    socket.on("sendMessage", (msg)=>{
      io.emit("displayMessage", msg);
    })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
})

expressServer.listen(port);