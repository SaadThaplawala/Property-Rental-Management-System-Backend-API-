const express = require('express');
const sequelize = require('./config/sequelize');
const app = express();




app.use(express.json());




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