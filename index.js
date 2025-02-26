// index.js
// where your node app starts

// init project
import express from "express";
import cors from 'cors';
import path from 'path';

const __dirname = path.resolve();
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api", function (req, res) {
  let date = new Date().toUTCString();
  let cUnix = +new Date();

  res.json({ unix: cUnix, utc: date });
});

app.get("/api/:date?", function (req, res) {
  let date_string = req.params.date;
  console.log("Data recebida:", date_string);
  let nUnixDate = new Date(date_string);

  if (req.params.date.includes("-")) {
    //gerando uma chave unix a partir de uma data

    let utcDate = new Date(date_string).toUTCString();
    if (new Date(date_string).toUTCString() === "Invalid Date") return res.json({ error: "Invalid Date" });

    res.json({ unix: +nUnixDate, utc: utcDate });
  } else {
    let cUnix = parseInt(date_string);
    let utcUnixDate = new Date(parseInt(date_string)).toUTCString();

    if (utcUnixDate === "Invalid Date")
      return res.json({ error: "Invalid Date" });

    res.json({ unix: cUnix, utc: utcUnixDate });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3033, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
