import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { TagList } from "./interfaces/types";

const app = express();

app.set("view engine", "pug");
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.get("/", (_req, res) => {
  res.render("index", {
    title: "Hey",
    message: "Hello there!",
  });
});
const checktemplates = () => {
  const fileList = ["database/taglist.json"];
  const dirList = ["database"];
  dirList.forEach((element) => {
    fs.readdir(element, (error, _files) => {
      if (error) {
        fs.mkdirSync("database");
      }
    });
  });
  fileList.forEach((element) => {
    fs.readFile(element, {}, async (error, _response) => {
      if (error) {
        const file = await fs.promises.open(element, "a");
        file.close();
      }
    });
  });
};
app.all("/put", (req: Request, res: Response) => {
  var obj = {
    table: [],
  };
  obj.table.push({
    id: 1,
    square: 2,
  });
  var json = JSON.stringify(obj.table);
  fs.writeFile("Hello.json", json, "utf-8", () => {});

  switch (req.method) {
    case "GET":
    case "POST":
      res.render("put", {
        title: "Hey",
        message: "Hello there!",
      });
      break;
  }
});
app.all("/keylist", async (req: Request, res: Response) => {
  const data: TagList[] = JSON.parse(fs.readFileSync("database/taglist.json", "utf-8"));
  switch (req.method) {
    case "GET":
    case "POST":
      res.render("keylist", {
        keys: data,
      });
      break;
  }
  fs.writeFileSync("database/taglist.json", JSON.stringify(data), "utf-8");
});
app.listen(3000, () => {
  checktemplates();
});
