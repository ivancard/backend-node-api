exports.success = function (req, res, msg, estado) {
    res.setHeader('Content-Type', 'text/json');

    res.status(estado || 200).send({
        error: '',
        body: msg,
    });
    res.end();
};

exports.error = function (req, res, msg, estado) {
    res.status(estado || 500).send({
        error: msg,
        body: '',
    });
};
