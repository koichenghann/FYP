const http = route = require ('http');
const app = require('./backend/app');
const port = 3000;

app.set('port', port)

const server = http.createServer(app);

// const server = http.createServer((req, res) => {
//   res.end('This is my first response')
// });

// server.listen(3000);

server.listen(port);

/*
const http = require('http');
const debug = require('debug')('node-angular');
const app = require('./backend/app');

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)){
    // named pipe
    return val;
  }

  if (port >= 0){
    // port number
    return port;
  }

  return false;

};

const onError = error => {
  if (error.syscall !== "listen"){
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe" + addr: "port" + port;
  switch (error.code){
    case "EACCES":
      console.error(bind + "requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in user");
      process.exit(1);
      break;
      default:
    throw error;
  }
};




const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr: "port" + port;
  debug("Listening on" + bind);
};

const port = normalizePort(process.env.PORT || 3000);

app.set('port', port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
*/
