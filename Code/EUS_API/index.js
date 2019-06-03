const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');


const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());



server.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true }
  );
});

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {

  var cus = require('./routes/customers')(server);
  var user = require('./routes/users')(server);
  var stud = require('./routes/student')(server);
  var registr = require('./routes/registrar')(server);
  console.log(`Server started on port ${config.PORT}`);
});
