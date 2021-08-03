import express from 'express';
import http from 'http';
import socketInit from './socket';

import api from './api';

// Setup Express application to serve the app/ directory
const app = express();
app.use(express.static('app'));

// Register API endpoints
app.use('/api/', api);

// Create an HTTP server and pass to the socket init
const server = http.createServer(app);
socketInit(server);
