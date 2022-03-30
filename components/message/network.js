const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/files/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    req.headers['auth'];
    const filterMessages = req.query.user || null;
    controller
        .getMessages(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch((e) => {
            response.error(req, res, 'Error inesperado', 500);
        });
});

router.post('/', upload.single('file'), (req, res) => {
    controller
        .addMessage(req.body.chat, req.body.user, req.body.msg, req.file)
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

router.delete('/:id', (req, res) => {
    controller
        .deleteMessage(req.params.id)
        .then(() => {
            response.success(
                req,
                res,
                `Mensaje con id: ${req.params.id} eliminado`,
                200
            );
        })
        .catch((e) => {
            response.error(req, res, `No se pudo eliminar el mensaje`, 500);
        });
});

module.exports = router;
