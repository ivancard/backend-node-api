const Model = require('./model');

const addChat = (chat) => {
    const newChat = new Model(chat);
    return newChat.save();
};

const listChats = (userId) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (userId) {
            filter = {
                users: userId,
            };
        }
        Model.find(filter)
            .populate('users')
            .exec((err, populate) => {
                if (err) {
                    reject(err);
                    return false;
                }
                resolve(populate);
            });
    });
};

module.exports = {
    add: addChat,
    list: listChats,
};
