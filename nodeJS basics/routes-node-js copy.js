const fs = require("fs");

const requestHandler = (req, res) => {
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
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, err => {
        res.writeHead(302, {
          Location: "/"
        });
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<p>Hello World</p>");
  res.end();
};

module.exports = requestHandler;
