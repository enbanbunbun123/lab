import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stylesheet/app.scss";

const App = () => {
  const [imageName, setImageName] = useState("");
  const [recognizedText, setRecognizedText] = useState("");

  const getImage = async () => {
    try {
      const response = await axios.get("http://localhost:3001/get-image");
      setImageName(response.data.imageName);
    } catch (error) {
      console.error(error);
    }
  };

  const moveImage = async (folderName: string) => {
    try {
      if (imageName) {
        await axios.get(
          `http://localhost:3001/move-image/${imageName}?folder=${folderName}`
        );
        getImage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startSpeechRecongnition = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/start-speech-recognition",
        { timeout: 10000 }
      ); // 10秒タイムアウト

      const lines = response.data.text.split("\n");
      const filteredLines = lines.filter(
        (line: string) => !line.includes("音声を認識中です...")
      );
      const voiceRecognizedText = filteredLines.join("\n");
      setRecognizedText(voiceRecognizedText);
      console.log(voiceRecognizedText);
      const trimmedVoiceRecognizedText = voiceRecognizedText.trim();

      if (trimmedVoiceRecognizedText === "コイル") {
        moveImage("coil");
      }
      if (trimmedVoiceRecognizedText === "コンデンサ") {
        moveImage("condenser");
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error starting speech recognition:", error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="app">
      <div className="app__input-image">
        {imageName && (
          <img
            src={`http://localhost:3001/images/${imageName}`}
            alt="Current"
          />
        )}
      </div>
      <div className="app__buttons">
        <button onClick={() => moveImage("coil")}>coil</button>
        <button onClick={() => moveImage("condenser")}>condenser</button>
        <button onClick={() => moveImage("d")}>Move to d</button>
        <button onClick={() => moveImage("e")}>Move to e</button>
        <button onClick={() => moveImage("f")}>Move to f</button>
      </div>
      <div className="app_speech-recognition-button">
        <button onClick={() => startSpeechRecongnition()}>音声認識開始</button>
        <p>音声認識結果: {recognizedText}</p>
      </div>
    </div>
  );
};

export default App;
