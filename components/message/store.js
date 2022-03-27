const db = require('mongoose');
const model = require('./model');

// mongodb+srv://db_user_ivan:69XfjZuvGHW1XRrd@cluster0.3gpde.mongodb.net/test

db.Promise = global.Promise;
db.connect(
    'mongodb+srv://db_user_ivan:69XfjZuvGHW1XRrd@cluster0.3gpde.mongodb.net/telegram_db',
    {
        useNewUrlParser: true,
    }
)
    .then(() => {
        console.log('[DB] Conectada con exito');
    })
    .catch((err) => {
        console.error(`[DB] ${err}`);
    });

const addMessage = (msg) => {
    const myMessage = new model(msg);
    myMessage.save();
};

const getMessage = async (filterUser) => {
    let filter = {};
    if (filterUser !== null) {
        filter = { user: filterUser };
    }
    const allMyMessages = await model.find(filter);
    return allMyMessages;
};

const updateMsg = async (id, msge) => {
    const requestedMessage = await model.findById(id);
    requestedMessage.msg = msge;

    const messageUpdated = await requestedMessage.save();

    return messageUpdated;
};

module.exports = {
    add: addMessage,
    list: getMessage,
    updateMsg: updateMsg,
    //update
    //delete
};
