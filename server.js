const express = require('express');
const bodyParser = require('body-parser');
// const router = require('./components/message/network');
const router = require('./network/routes');
const db = require('./db');

db(
    'mongodb+srv://db_user_ivan:69XfjZuvGHW1XRrd@cluster0.3gpde.mongodb.net/telegram_db'
);

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(router);
router(app);

app.use('/app', express.static('public'));

app.listen(3000);
console.log('La aplicacion está corriendo en http://localhost:3000');
