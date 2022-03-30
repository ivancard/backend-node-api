const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', (req, res) => {
    controller
        .addChat(req.body.users)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch((err) => response.error(req, res, 'Error interno', 500));
});

router.get('/', (req, res) => {
    controller
        .listChats(req.params.userId)
        .then((users) => {
            response.success(res, res, users, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error interno', 500);
        });
});
module.exports = router;
