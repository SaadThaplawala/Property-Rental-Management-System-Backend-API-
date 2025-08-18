const express = require('express');
const sequelize = require('./config/sequelize');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/user');
const propertyRoutes = require('./routes/property');
const contractRoutes = require('./routes/contract');
const paymentRoutes = require('./routes/payment');
const loginRoutes = require('./routes/login')



app.use(express.json());

app.use('/users', userRoutes);
app.use('/properties', propertyRoutes);
app.use('/contracts', contractRoutes);
app.use('/payments', paymentRoutes);
app.use('/login',loginRoutes);


sequelize.auth
  .then(() => {
    const port = 3000
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });