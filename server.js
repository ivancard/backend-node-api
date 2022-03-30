const express = require('express');
const app = express();
const server = require('http').Server(app);

const { dbUrl, port, host } = require('./config');

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const router = require('./network/routes');
const db = require('./db');

db(dbUrl);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

socket.connect(server);

router(app);

app.use('/app', express.static('public'));

server.listen(port, () => {
    console.log(`La aplicacion está corriendo en ${host}:${port}`);
});
