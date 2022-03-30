const statusMessages = {
    200: 'Done',
    201: 'Created',
    400: 'Invalid format',
    500: 'Internal Error',
};

exports.success = function (req, res, msg, estado) {
    res.setHeader('Content-Type', 'text/json');

    let statusCode = estado;
    let statusMessage = msg;

    if (!estado) {
        estado = 200;
    }
    if (!msg) {
        statusMessage = statusMessages[estado];
    }

    res.status(statusCode).send({
        error: '',
        body: statusMessage,
    });
    res.end();
};

exports.error = function (req, res, msg, estado) {
    res.status(estado || 500).send({
        error: msg,
        body: '',
    });
};
