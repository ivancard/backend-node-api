const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    controller
        .getMessages()
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch((e) => {
            response.error(req, res, 'Error inesperado', 500);
        });
});

router.post('/', (req, res) => {
    controller
        .addMessage(req.body.user, req.body.msg)
        .then((fullMesage) => {
            console.log(fullMesage);
            response.success(req, res, fullMesage, 201);
        })
        .catch((e) => {
            response.error(req, res, 'Informacion no valida', 400);
        });
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { msg } = req.body;

    // console.log({ id, msg });

    try {
        const data = await controller.updateMessage(id, msg);

        response.success(req, res, data, 201);
    } catch (error) {
        console.error('Hubo un error: \n' + error);
        response.error(req, res, 'Error interno', 400);
    }
});

// router.delete('/', (req, res) => {
//     console.log(req.body);
//     response.success(req, res, 'Mensaje eliminado');
// });

module.exports = router;
