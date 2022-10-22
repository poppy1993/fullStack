const mongoose = require('mongoose');

const MONGODBURL = 'mongodb+srv://AlbertBird:qwerasdf@cluster0.wttcowf.mongodb.net/test';
mongoose.connect(MONGODBURL);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
});

database.once('connected', () => {
  console.log('Database Connected');
});