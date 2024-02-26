require('./config/config');
require('./db');

const express = require("express");
const bodyParser = require ("body-parser");
const cors = require('cors');
const { mongoose} = require('./db.js');
var employeeController = require('./controllers/employeeController.js');
var usercontroller = require('./controllers/userControllers.js');
var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(3000, () => console.log('Server started at port: 3000'));
const rtsIndex = require('./routes/app.routes');

app.use('/employees', employeeController);
app.use('/users',rtsIndex);