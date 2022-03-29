const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', (req, res) => {
    const filterUsers = req.query.user || null;

    controller
        .getUsers(filterUsers)
        .then((userList) => {
            response.success(req, res, userList, 200);
        })
        .catch((e) => {
            response.error(req, res, 'Error inesperado', 500);
        });
});

router.post('/', (req, res) => {
    controller
        .addUser(req.body.name)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(() => {
            response.error(req, res, 'No se puedo guardar usuario', 500);
        });
});

router.get('/', (req, res) => {
    response.success(req, res, 'Lista de usuarios', 201);
});

module.exports = router;
