const store = require('./store');

const getUsers = (filterUsers) => {
    return store.list(filterUsers);
};

const addUser = (userName) => {
    if (!userName) {
        return Promise.reject('No hay nombre de usuario');
    }
    const newUser = { name: userName };
    return store.add(newUser);
};

module.exports = {
    addUser,
    getUsers,
};
