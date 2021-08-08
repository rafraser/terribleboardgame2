import dotenv from 'dotenv';
import path from 'path';

// This logic has been setup to mimic vue-cli's environment variables as closely as possible
// See https://cli.vuejs.org/guide/mode-and-env.html#environment-variables

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.production') });
  dotenv.config({ path: path.resolve(process.cwd(), '.env.production.local') });
} else {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.development') });
  dotenv.config({ path: path.resolve(process.cwd(), '.env.development.local') });
  process.env.NODE_ENV = 'development';
}

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
console.log(process.env.NODE_ENV);
