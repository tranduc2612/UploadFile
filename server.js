const http = require("http");
const formidable = require("formidable");
const fs = require("fs");

const viewFormUpload = fs.readFileSync("./views/viewUploadForm.html");

http
  .createServer(function (req, res) {
    if (req.url === "/upload" && req.method === "POST") {
      const form = formidable({ multiples: true });
      form.parse(req, function (err, fields, files) {
        if (err) {
          console.log(err);
        }
        res.writeHead(200, { "Content-Type": "application/json" });

        const dataImgInput = JSON.parse(
          JSON.stringify({ fields, files }, null, 2)
        ).files.multipleFiles;
        console.log(JSON.parse(JSON.stringify({ fields, files }, null, 2)));
        console.log(dataImgInput);
        dataImgInput.forEach((e) => {
          let tmpPath = e.filepath;
          let newPath = __dirname + "/uploads/" + e.originalFilename;
          console.log(newPath);
          fs.readFile(newPath, (err) => {
            if (err) {
              fs.copyFile(tmpPath, newPath, (err) => {
                if (err) throw err;
              });
            }
          });
        });
      });
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(viewFormUpload);
    }
  })
  .listen(8080);
