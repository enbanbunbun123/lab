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
      console.log("bbb");
      const response = await axios.get(
        "http://localhost:3001/start-speech-recognition",
        { timeout: 10000 }
      ); // 10秒タイムアウト
      setRecognizedText(response.data.text);
      console.log("aaaa");
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
        <button onClick={() => moveImage("b")}>Move to b</button>
        <button onClick={() => moveImage("c")}>Move to c</button>
        <button onClick={() => moveImage("d")}>Move to d</button>
        <button onClick={() => moveImage("e")}>Move to e</button>
        <button onClick={() => moveImage("f")}>Move to f</button>
      </div>
      <div className="app_speech-recognition-button">
        <button onClick={() => startSpeechRecongnition()}>音声認識開始</button>
        <p>Recognized Text: {recognizedText}</p>
      </div>
    </div>
  );
};

export default App;
