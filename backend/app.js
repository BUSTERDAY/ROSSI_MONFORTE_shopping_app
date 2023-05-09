const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const routeshightechs = require('./routes/route.js');

app.use(cors({
    origin: '*'
}))

app.use(routeshightechs);

app.listen(port, () => console.log(`listening on port ${port}`));