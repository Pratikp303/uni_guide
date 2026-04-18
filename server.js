const app = require('./src/app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/uniguide')
  .then(() => {
    console.log("DB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });

  })
  .catch(err => console.log(err));
  require('dotenv').config();