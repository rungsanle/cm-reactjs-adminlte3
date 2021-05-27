const express = require('express');
const cors = require('cors');
const dotenv  = require('dotenv');
const morgan = require('morgan');

const app = express();
// const pool = require('./dbcon');

dotenv.config({path: './app/config/.env'});

//log request
app.use(morgan('tiny'));

app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const db = require('./app/config/db.config');
  
//db.sequelize.sync();

//force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: true }');
});

require('./app/routes/authen.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/turorial.routes')(app);
require('./app/routes/location.routes')(app);
require('./app/routes/locationtype.routes')(app);
require('./app/routes/warehouse.routes')(app);

app.use('/', (req, res) => {
  res.json({
    message: "Welcome to Restful API"
  });
});

const port = process.env.NODE_SERVER_PORT;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});