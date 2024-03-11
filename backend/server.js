const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 3001;

// CORSの設定
app.use(cors());

app.use("/images", express.static("/Users/takahashiyuuho/Desktop/a"));

app.set("port", process.env.PORT || 3001);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// 画像を取得するエンドポイント
app.get("/get-image", (req, res) => {
  const directoryPath = "/Users/takahashiyuuho/Desktop/a";
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send(err);
    }

    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    if (imageFiles.length > 0) {
      res.send({ imageName: imageFiles[0] });
    } else {
      res.send({ imageName: "" });
    }
  });
});

// 画像を移動するエンドポイント
app.get("/move-image/:imageName", (req, res) => {
  const { imageName } = req.params;
  const folder = req.query.folder;
  const oldPath = path.join("/Users/takahashiyuuho/Desktop/a", imageName);
  const newPath = path.join(
    `/Users/takahashiyuuho/Desktop/${folder}`,
    imageName
  );

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: "Image moved successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
