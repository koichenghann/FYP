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

