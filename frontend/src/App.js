import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const ENDPOINT = "http://localhost:3001";

const userId = uuidv4();
const login = () => axios.post(`${ENDPOINT}/login`, { userId });

function App() {
  const [response, setResponse] = useState("");
  useEffect(async () => {
    const socket = await socketIOClient(ENDPOINT);

    await login();

    socket.emit( "GET_PRICE", userId );

    socket.on("NEW_PRICE", data => {
      setResponse(data);
    });
  }, []);

  return (
      <React.Fragment>
        <p> Current price of Crypto: { response } </p>
      </React.Fragment>
  );
}

export default App;
