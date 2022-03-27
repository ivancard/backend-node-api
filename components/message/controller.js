const store = require('./store');

const addMessage = (user, msg) => {
    return new Promise((resolve, reject) => {
        if (!user || !msg) {
            console.error(`[messageController] No hay usuario o mensage`);
            reject('Faltan datos.');
            return false;
        }
        const fullMesage = {
            user: user,
            msg: msg,
            date: new Date(),
        };

        store.add(fullMesage);

        resolve(fullMesage);
    });
};

const getMessages = () => {
    return new Promise((resolve, reject) => {
        resolve(store.list());
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
};
