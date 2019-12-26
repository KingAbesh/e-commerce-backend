const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Please enter a message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send<button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url == "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "Here is a message");
    res.writeHead(302, {
      Location: "/"
    });
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<p>Hello World</p>");
  res.end();
});

server.listen(3000);
