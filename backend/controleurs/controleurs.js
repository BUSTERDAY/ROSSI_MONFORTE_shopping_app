const data = require('../data.json');

// récup toutes les sneakers
exports.gethightechs = (req, res) => {
    const id = parseInt(req.params.id);
    const hightechs = data.hightechs;

    if(!hightechs) {
        return res.status(404).send("objets hightech non trouver");
    } else {
        res.status(200).json({
            message: "objets hightech trouver",
            hightechs
        });
    }
};

exports.gethightechById = (req, res) => {
    const id = parseInt(req.params.id);
    const hightechs = data.hightechs;

    const hightech = hightechs.find(hightech => hightech.id === id);

    if(!hightech) {
        return res.status(404).send("objets hightech non trouver");
    } else {
        res.status(200).json({
            message: "objets hightech trouver",
            hightech : hightech
        });
    }
};

