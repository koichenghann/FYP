//import http package provuded by Node
const http = require ('http'); //require= import. import http package and store a variable

//import the constant app
const app = require('./backend/app');

const port = 3000;

//to set the configuration for exporess
app.set('port',port)
//pass the app to create server
const server = http.createServer(app);

//http server object listen to the port and execute a function
server.listen(port);

