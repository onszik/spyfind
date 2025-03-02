import React, { useEffect, useState } from 'react';
import Peer from "peerjs";
import './App.css';

//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Home from './components/Home.jsx';
//import Game from './components/Game';
//<Route path="/game" element={<Game />} />

function App() {
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState("");
  const [connections, setConnections] = useState([]);
  const [timer, setTimer] = useState(600);

  useEffect(() => {
    // // Connect to peerjs server
    // const peer = new Peer(undefined, {
    //   host: 'localhost',
    //   port: 9000,
    //   path: '/peerjs',
    //   secure: false
    // });
    const peer = new Peer(undefined, {
      host: 'peerjs.com',
      secure: true,
      port: 443,
      path: '/peerjs'
    })

    peer.on("open", (id) => {
      setPeer(peer);
      setPeerId(id);
      console.log("My peer ID: ", id);
    });

    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        console.log("Recieved timer update: ", data);
        setTimer(data);
      });

      setConnections((prev) => [...prev, conn]);
    });

    return () => peer.destroy();
  }, []);

  const startTimer = () => {
    let time = 600;
    const interval = setInterval(() => {
      time -= 1;
      setTimer(time);

      //Send timer update to peers
      connections.forEach((conn) => conn.send(time));

      if (time <= 0) clearInterval(interval);
    }, 1000);
  };

  var timeM = Math.floor(timer / 60);
  var timeS = timer % 60;
  if (timeS <= 9) {
      timeS = '0' + timeS;
  }
  var formattedTime = timeM + ':' + timeS;

  startTimer();

  return (
    <div>
        <p>Your peer ID: {peerId}</p>
        <h2>Timer: {formattedTime}</h2>
    </div>
  )
  /*
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
    */
}

export default App;