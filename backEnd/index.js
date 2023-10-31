const express = require('express');
const bodyParser = require("body-parser")
const route = require("./routes/route")
const cors = require("cors")
//---------connecting to mongodb----------
require("./connection/connection")


const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});