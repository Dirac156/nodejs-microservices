const express  = require('express');
const dotenv  = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const routes  = require('./routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(cors());


app.use('/api/v1', routes);

var server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  
});