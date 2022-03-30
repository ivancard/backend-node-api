const model = require('./model');

// mongodb+srv://db_user_ivan:69XfjZuvGHW1XRrd@cluster0.3gpde.mongodb.net/test

const addMessage = (msg) => {
    const myMessage = new model(msg);
    myMessage.save();
};

const getMessage = (filterUser) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterUser !== null) {
            filter = { user: filterUser };
        }
        model
            .find(filter)
            .populate('user')
            .exec((err, populated) => {
                if (err) {
                    reject(err);
                    return false;
                }
                resolve(populated);
            });
    });
};

const updateMsg = async (id, msge) => {
    const requestedMessage = await model.findById(id);
    requestedMessage.msg = msge;

    const messageUpdated = await requestedMessage.save();

    return messageUpdated;
};

const deleteMessage = (id) => {
    return model.deleteOne({ _id: id });
};

module.exports = {
    add: addMessage,
    list: getMessage,
    updateMsg: updateMsg,
    remove: deleteMessage,
};
