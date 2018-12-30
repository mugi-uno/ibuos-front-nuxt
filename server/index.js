require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const { Builder, Nuxt } = require('nuxt');

const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 1234;

app.set('port', port);

// `req.body` へアクセスするための Body parser
app.use(bodyParser.json());

// `req.session` を作るためのセッション
app.use(
  session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js'); // tslint:disable-line no-var-requires
config.dev = !(process.env.NODE_ENV === 'production');

// Init Nuxt.js
const nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);

console.log('Server listening on ' + host + ':' + port); // eslint-disable-line
