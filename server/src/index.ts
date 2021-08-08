import './env';
import express from 'express';
import cors from 'cors';
import socketInit from './socket';
import api from './api';

// Setup Express
const app = express();

if (process.env.NODE_ENV === 'production') {
  // Production front-end is directly served
  // Setup catch-all route so everything gets sent to the Vue router
  const CONTENT_DIR = process.env.CONTENT_DIR || 'public';
  app.use(express.static(`${CONTENT_DIR}`));
  app.use('/api', api);

  const defaultHandler = (_: any, res: express.Response) => { res.sendFile(`./${CONTENT_DIR}/index.html`, { root: '.' }); };
  app.get('/*', defaultHandler);
} else {
  // Development front-end is a seperate application
  app.use(cors());
  app.use('/api/', api);
}

// Create an HTTP server and pass to the socket init
const port = process.env.EXPRESS_PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server started on *:${port}`);
});

socketInit(server);
