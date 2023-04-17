const data = require('../data.json');

// récup toutes les sneakers
exports.getSneakers = (req, res) => {
    const id = parseInt(req.params.id);
    const sneakers = data.sneakers;

    if(!sneakers) {
        return res.status(404).send("sneakers non trouver");
    } else {
        res.status(200).json({
            message: "sneakers trouver",
            sneakers
        });
    }
};

exports.getSneakersById = (req, res) => {
    const id = parseInt(req.params.id);
    const sneakers = data.sneakers;

    const sneaker = sneakers.find(sneaker => sneaker.id === id);

    if(!sneaker) {
        return res.status(404).send("sneaker non trouver");
    } else {
        res.status(200).json({
            message: "sneaker trouver",
            sneaker : sneaker.name
        });
    }
};

