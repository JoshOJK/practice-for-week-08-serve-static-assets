const http = require('http');
const fs = require("fs");

function getContentType(fileName) {
  const ext = fileName.split(".")[1];
  let contentType = 'text/plain';
  switch (ext) {
    case "jpg":
    case "jpeg":
      contentType = "image/jpeg";
      break;
    case "png":
      contentType = "image/png";
      break;
    case "css":
      contentType = "text/css";
      break;
    default:
      contentType = "text/plain";
      break;
  }
  return contentType;
  // equivalent if-else-if statements:
  // if (ext === 'jpg' || ext === 'jpeg') {
  //   return "image/jpeg";
  // } else if (ext === "png") {
  //   return "image/png"
  // } else {
  //   return "text/plain"
  // }
}


const server = http.createServer((req, res) => {
      if (req.method === 'GET' && req.url.startsWith('/static') ) {
        let splitPath = req.url.split('/static')[1]

        try {
          const fileGuy = fs.readFileSync(`./assets/${splitPath}`)
          res.statusCode = 200;
          res.setHeader('Content-Type', getContentType(splitPath));
          return res.end(fileGuy);
        } catch {
          console.error(`cannot find asset ${splitPath} sucks to suck`);
          res.statusCode = 404
          return res.end()
        }


      }
      const hello = fs.readFileSync("./index.html")
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(hello);

});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
