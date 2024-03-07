import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const port = 3001;
const desktopPath = path.join(require("os").homedir(), "Desktop", "img");

app.get("/images", (req, res) => {
  fs.readdir(desktopPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading files");
      return;
    }
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/.test(file)
    );
    res.json(
      imageFiles.map((file) => `http://localhost:${port}/images/${file}`)
    );
  });
});

app.use("/images", express.static(desktopPath));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
