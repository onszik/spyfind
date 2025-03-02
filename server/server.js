const express = require("express");
const { ExpressPeerServer } = require("peer");
const http = require("http");

const app = express();
const server = http.createServer(app);

// PeerJS server setup with CORS enabled
const peerServer = ExpressPeerServer(server, {
    debug: true,  // Enable debug mode
    path: "/peerjs", // Path for PeerJS
    cors: {
      origin: "http://localhost:5173",  // Your React app's URL
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"]
    }
});

app.use("/peerjs", peerServer);

server.listen(9000, () => {
    console.log("PeerJS server running on http://localhost:9000");
  });