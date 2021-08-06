import express from 'express';
import http from 'http';
import cors from 'cors';
import socketInit from './socket';

import api from './api';

// Setup Express application to serve the app/ directory
const app = express();
app.use(express.static(`${__dirname}/app`));

// Register API endpoints
app.use('/api/', api);

// Use CORS in development
app.use(cors());

// Create an HTTP server and pass to the socket init
const server = http.createServer(app);
socketInit(server);

server.listen(3000, () => {
  console.log('Server started on *:3000');
});
