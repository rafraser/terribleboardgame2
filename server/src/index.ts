import express from 'express';
import cors from 'cors';
import socketInit from './socket';

import api from './api';

// Setup Express
const app = express();
app.use(cors());
app.use('/api/', api);
app.use(express.static(`${__dirname}/app`));

// Create an HTTP server and pass to the socket init
const server = app.listen(3000, () => {
  console.log('Server started on *:3000');
});
socketInit(server);
