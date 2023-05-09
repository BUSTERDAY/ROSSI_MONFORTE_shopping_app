let Key = require('./ValidKey.json')

const authenticateKey = (req, res, next) => {
    let api_key = req.header("x-api-key"); //Add API key to headers
    let verif;

    for (let i = 0; i < 9; i++) {

        if (Key["Valid_key"][`${i}`] === api_key) {
            verif = true;
            break;
        } else {
            verif = false
        }
    }

    if (verif) {
        console.log("Good API call");
        next();
    } else {
        //Reject request if API key doesn't match
        res.status(403).send({error: {code: 403, message: "You not allowed."}});
    }
};
module.exports = {authenticateKey};