const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/meanDB')
  .then(() => {
    console.log('MongoDB connection succeeded');
  })
  .catch((err) => {
    console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
  });


  require('./models/user.model');

module.exports = mongoose;