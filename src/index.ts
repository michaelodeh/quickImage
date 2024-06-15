import express, { Express } from "express";
import { Photo } from "./phote.entity";
import fs from "fs";
import * as path from "path";
const app: Express = express();
import * as crypto from "crypto";
import AppDataSource from "./ data-source";

require("dotenv").config();

const port: number = Number(process.env.PORT || 3000);
const host: string = process.env.SERVER_HOST || "localhost";

app.use(express.json({ limit: "10000mb" }));
app.use(express.urlencoded({ extended: true, limit: "10000mb" }));

app.use(express.static(path.join("public")));

function saveBase64Image(base64Str: string, filePath: string) {
  // Decode the Base64 string
  const base64Data = base64Str.replace(/^data:image\/png;base64,/, "");
  const imageBuffer = Buffer.from(base64Data, "base64");
  // Write the image buffer to a file
  fs.writeFile(filePath, imageBuffer, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File saved successfully:", filePath);
    }
  });
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/add", async (req, res) => {
  const data = req.body;
  console.log(data.phone);
  if (data.image) {
    const name =
      crypto.createHash("md5").update(Math.random().toString()).digest("hex") +
      `.png`;
    const filePath = path.join("public", "images", name);
    saveBase64Image(data.image, filePath);
    const photo = new Photo();
    photo.phone = data.phone;
    photo.name = name;
    await AppDataSource.manager.save(photo);

    res.json({
      status: "success",
    });
  } else {
    res.json({
      status: "failed",
    });
  }
});

app.get("/get/:phone", async (req, res) => {
  const url = req.headers.host;
  const protocol = req.protocol;
  const phone = req.params.phone;
  const photos = await AppDataSource.manager.findBy(Photo, {
    phone: phone,
  });
  let data: any[] = [];
  for (const phone in photos) {
    data.push(`${protocol}://${url}/images/${photos[phone].name}`);
  }

  res.json({
    status: "success",
    data: data.reverse(),
  });
});

app.listen(port, host, () => {
  console.log(`Server is running on port http://${host}:${port}`);
});
