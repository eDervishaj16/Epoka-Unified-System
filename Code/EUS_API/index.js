const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

//mongodb pass bB6nA8B6PFJxV-j
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


  let user = require('./routes/users')(server);
  let stud = require('./routes/student')(server);
  let registr = require('./routes/registrar')(server);
  let lect = require('./routes/lecturer')(server);
  let admin = require('./routes/admin')(server);
  console.log(`Server started on port ${config.PORT}`);
});
