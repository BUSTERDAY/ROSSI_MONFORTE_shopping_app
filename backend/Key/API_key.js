let Key = require('./ValidKey.json')
let nbr_util = 0
let date_start = Date.now()

const authenticateKey = (req, res, next) => {
    let api_key = req.header("x-api-key"); //Add API key to headers
    let verif;
    console.log(date_start)

    for (let i = 0; i < 9; i++) {

        if (Key["Valid_key"][`${i}`] === api_key) {
            verif = true;
            break;
        } else {
            verif = false
        }
    }
    if (verif) {
        if (nbr_util>= 200 && ( Date.now()-date_start ) <600000){
            res.status(429).send({
                error: {
                    code: 429,
                    message: "Max API calls exceeded.",
                }})
        } else if(nbr_util<=200 && ( Date.now()-date_start ) > 600000) {
                nbr_util = 0;
                date_start = Date.now();
        } else if (nbr_util< 20) {
            console.log("Good API call");
            nbr_util+=1;
            console.log(nbr_util)
            console.log( Date.now()-date_start )
            next();
        }
        } else {
        //Reject request if API key doesn't match
        res.status(403).send({error: {code: 403, message: "You not allowed."}});
    }
};
module.exports = {authenticateKey};