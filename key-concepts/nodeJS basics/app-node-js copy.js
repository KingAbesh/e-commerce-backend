const http = require("http");

const routes = require("./routes-node-js");

const server = http.createServer(routes);

server.listen(3000);
