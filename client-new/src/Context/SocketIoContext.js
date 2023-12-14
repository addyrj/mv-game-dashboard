import React from 'react';
import socketIOClient from 'socket.io-client';
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

// server side socket io connection.
// const END_POINT = 'http://localhost:8000';

// web socket
export const socket = socketIOClient(REACT_APP_BASE_URL, {
   transports: ['websocket'],
   forceNew: true,
});

// socket context
export const SocketContext = React.createContext();
