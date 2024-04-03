import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stylesheet/app.scss";

const App = () => {
  const [imageName, setImageName] = useState("");

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
    </div>
  );
};

export default App;
