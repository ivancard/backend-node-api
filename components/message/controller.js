const store = require('./store');
const socket = require('../../socket').socket;
const addMessage = (chat, user, msg, file) => {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !msg) {
            console.error(`[messageController] No hay usuario o mensage`);
            reject('Faltan datos.');
            return false;
        }

        let fileUrl = ``;

        if (file) {
            fileUrl = `http://localhost:3000/app/files/${file.filename}`;
        }

        const fullMesage = {
            chat: chat,
            user: user,
            msg: msg,
            date: new Date(),
            file: fileUrl,
        };

        store.add(fullMesage);

        socket.io.emit('message', fullMesage);

        resolve(fullMesage);
    });
};

const getMessages = (filterUser) => {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    });
};

const deleteMessage = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject(`ID invalido`);
            return false;
        }
        store
            .remove(id)
            .then(() => {
                resolve();
            })
            .catch((e) => reject(e));
    });
};
const updateMessage = (id, msg) => {
    return new Promise(async (resolve, reject) => {
        if (id && msg) {
            try {
                const data = await store.updateMsg(id, msg);
                resolve(data);
            } catch (error) {
                reject(new Error('Hubo un error' + error));
            }
        } else {
            reject(new Error('Faltan parametros'));
        }

        // if (!id || !msg) {
        //     reject('Faltan datos');
        //     return false;
        // }
        // const result = await store.updateMsg(id, msg);
        // resolve(result);
    });
};

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};
