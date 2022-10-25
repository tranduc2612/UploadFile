const http = require("http");
const formidable = require("formidable");
const fs = require("fs");

const viewFormUpload = fs.readFileSync("./views/viewUploadForm.html");

http
  .createServer(function (req, res) {
    if (req.url === "/upload" && req.method === "POST") {
      let form = new formidable.IncomingForm();
      form.keepExtensions = true;
      form.multiple = true;

      form.parse(req);
      form.on("fileBegin", (name, file) => {
        file.path = __dirname + "/uploads" + file.name;
      });

      form.on("file", (name, file) => {
        console.log(file.name);
      });

      res.end();
      //   form.parse(req, function (err, fields, files) {
      //     if (err) {
      //       console.log(err);
      //     }
      //     let tmpPath = files.img.filepath;
      //     console.log(files.img);
      //     // console.log(files);
      //     let newPath = __dirname + "/uploads/" + files.img.originalFilename;
      //     console.log(newPath);
      //     fs.readFile(newPath, (err) => {
      //       if (err) {
      //         fs.copyFile(tmpPath, newPath, (err) => {
      //           if (err) throw err;
      //         });
      //       }
      //     });
      //   });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(viewFormUpload);
    }
  })
  .listen(3000);
