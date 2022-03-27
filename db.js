const db = require('mongoose');

db.Promise = global.Promise;

const connect = (url) => {
    db.connect(url, {
        useNewUrlParser: true,
    })
        .then(() => {
            console.log('[DB] Conectada con exito');
        })
        .catch((err) => {
            console.error(`[DB] ${err}`);
        });
};

module.exports = connect;
