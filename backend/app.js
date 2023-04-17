const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const routesSneakers = require('./routes/sneakers.js');

app.use(cors({
    origin: '*'
}))


app.use(routesSneakers);



app.listen(port, () => console.log(`listening on port ${port}`));