'use strict';

require('dotenv').config({path:'config/dev.env'});
require('../db/mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression')
const hbs = require('hbs');


const http = require('http');
const path = require('path');

//App 
const app = express();

const port = process.env.PORT;
console.log(__dirname);
//Path
const public_path = path.join(__dirname,'../../public');
const hbs_path = path.join(__dirname,'../../template/partials');
const viewPath = path.join(__dirname,'../../template/view');
app.use(express.static(public_path));

// Register Partials ########################## Change The Views //
hbs.registerPartials(hbs_path);

hbs.registerHelper('handle_date', function(date){ 
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const monthIndex = date.getMonth();
  const monthName = months[monthIndex]
  const dayIndex = date.getDay()
  const dayName = days[dayIndex];
  return `${dayName}, ${monthName} ${date.getFullYear()}`;
});

app.set('views', viewPath);
//Set View Engine Am Using HBS
app.set('view engine', 'hbs');



app.use(cors());

//Configure Modules
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

// //Configuring Routers
const authRoutes = require('./../api/routes/authentication');
const dashboardRoutes = require('./../api/routes/dashboard');
const prayerRoutes = require('./../api/routes/prayer');


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(authRoutes);
app.use(dashboardRoutes);
app.use(prayerRoutes);
// app.use('/dist/', profileRoutes);
// app.use('/dist/', paymentRoutes);


//Handling Errors
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(port, () => {
  console.log(`App Running on PORT ${port}`);
});