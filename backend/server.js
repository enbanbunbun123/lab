const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { spawn } = require("child_process");
const app = express();
const PORT = 3001;

// CORSの設定
app.use(cors());

app.use(
  "/images",
  express.static(
    "C:\\研究(ロボットマニピュレータ)\\MATLAB_研究\\高橋_MATLAB\\転移学習_VGG16\\Unknown"
  )
);
//macでのパス
//app.use("/images", express.static("/Users/takahashiyuuho/Desktop/unknown"));

app.set("port", process.env.PORT || 3001);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// 画像を取得するエンドポイント
app.get("/get-image", (req, res) => {
  const directoryPath =
    "C:\\研究(ロボットマニピュレータ)\\MATLAB_研究\\高橋_MATLAB\\転移学習_VGG16\\Unknown";
  //macでのパス
  //const directoryPath = "/Users/takahashiyuuho/Desktop/unknown";
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
  const oldPath = path.join(
    "C:\\研究(ロボットマニピュレータ)\\MATLAB_研究\\高橋_MATLAB\\転移学習_VGG16\\Unknown",
    imageName
  );
  //macでのパス
  //const oldPath = path.join("/Users/takahashiyuuho/Desktop/unknown", imageName);

  const newPath = path.join(
    `C:\\研究(ロボットマニピュレータ)\\MATLAB_研究\\高橋_MATLAB\\転移学習_VGG16\\proto1_Learn\\${folder}`,
    imageName
  );

  //macでのパス
  // const newPath = path.join(
  //   `/Users/takahashiyuuho/Desktop/${folder}`,
  //   imageName
  // );

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: "Image moved successfully" });
  });
});

// 音声認識を開始するエンドポイント
app.get("/start-speech-recognition", (req, res) => {
  console.log("Starting speech recognition...");
  const pythonProcess = spawn("python", [
    "C:\\Users\\CapiLab\\Desktop\\lab\\speech-recognition\\index.py",
  ]);
  //macでのパス
  // const pythonProcess = spawn("python", [
  //   "/Users/takahashiyuuho/Documents/lab/speech-recognition/index.py",
  // ]);
  console.log("Python script started");
  let outputData = "";

  pythonProcess.stdout.on("data", (data) => {
    outputData += data.toString();
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
    res.json({ text: outputData }); // 音声認識結果をJSON形式で送信
  });
});

app.post("/start-image-recognition", (req, res) => {
  const imagePath = req.body.imagePath;
  console.log("Starting image recognition...");
  const pythonProcess = spawn("python", [
    "/Users/takahashiyuuho/Documents/lab/image-recognition/index.py",
    imagePath,
  ]);
  console.log("Python script started");
  let outputData = "";

  pythonProcess.stdout.on("data", (data) => {
    outputData += data.toString();
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
    res.json({ text: outputData });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
