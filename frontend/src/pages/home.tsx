import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [imageName, setImageName] = useState("");

  const getImage = async () => {
    try {
      const response = await axios.get("http://localhost:3001/get-image");
      setImageName(response.data.imageName);
    } catch (error) {
      console.error(error);
    }
  };

  const moveImage = async () => {
    try {
      if (imageName) {
        await axios.get(`http://localhost:3001/move-image/${imageName}`);
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
    <div>
      {imageName && <img src={`a/${imageName}`} alt="Current" />}
      <button onClick={moveImage}>Move Image</button>
    </div>
  );
};

export default Home;
