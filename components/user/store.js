const Model = require('./model');

const getUsers = async (filterUsers) => {
    let filter = {};
    if (filterUsers) {
        filter = { name: filterUsers };
        console.log('Hola');
    }
    const allUsers = await Model.find(filter);
    // console.log(filter);
    return allUsers;
};

const addUser = (userName) => {
    const newUser = new Model(userName);
    return newUser.save();
};

module.exports = {
    add: addUser,
    list: getUsers,
};
