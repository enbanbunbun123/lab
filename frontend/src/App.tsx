import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stylesheet/app.scss";
import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";

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
        moveImage("Coil");
      }
      if (
        trimmedVoiceRecognizedText === "コンデンサ" ||
        trimmedVoiceRecognizedText === "コンデンサー"
      ) {
        moveImage("Condenser");
      }
      if (
        trimmedVoiceRecognizedText === "IC" ||
        trimmedVoiceRecognizedText === "アイシー"
      ) {
        moveImage("IC");
      }
      if (trimmedVoiceRecognizedText === "コネクター") {
        moveImage("Connector");
      }
      if (
        trimmedVoiceRecognizedText === "PCB" ||
        trimmedVoiceRecognizedText === "ピーシービー"
      ) {
        moveImage("PCB");
      }
      if (trimmedVoiceRecognizedText === "メタル") {
        moveImage("Metal");
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
    <Box className="app">
      <Box className="app__input-image">
        {imageName && (
          <Image
            src={`http://localhost:3001/images/${imageName}`}
            alt="Current"
            boxSize="sm"
          />
        )}
      </Box>

      <HStack spacing={4} margin="20px 0 0">
        <Button
          onClick={() => moveImage("Coil")}
          variant="outline"
          borderColor="gray.500"
          color="black"
          _hover={{ bg: "gray.100", borderColor: "gray.600" }}
        >
          Coil
        </Button>
        <Button
          onClick={() => moveImage("Condenser")}
          variant="outline"
          borderColor="gray.500"
          color="black"
          _hover={{ bg: "gray.100", borderColor: "gray.600" }}
        >
          Condenser
        </Button>
        <Button
          onClick={() => moveImage("IC")}
          variant="outline"
          borderColor="gray.500"
          color="black"
          _hover={{ bg: "gray.100", borderColor: "gray.600" }}
        >
          IC
        </Button>
        <Button
          onClick={() => moveImage("Connector")}
          variant="outline"
          borderColor="gray.500"
          color="black"
          _hover={{ bg: "gray.100", borderColor: "gray.600" }}
        >
          Connector
        </Button>
        <Button
          onClick={() => moveImage("PCB")}
          variant="outline"
          borderColor="gray.500"
          color="black"
          _hover={{ bg: "gray.100", borderColor: "gray.600" }}
        >
          PCB
        </Button>
        <Button
          onClick={() => moveImage("Metal")}
          variant="outline"
          borderColor="gray.500"
          color="black"
          _hover={{ bg: "gray.100", borderColor: "gray.600" }}
        >
          Metal
        </Button>
      </HStack>

      <VStack spacing={4}>
        <Text fontSize="md" margin="20px 0 10px">
          音声認識結果: {recognizedText}
        </Text>
        <Button
          onClick={() => startSpeechRecongnition()}
          variant="outline"
          borderColor="gray.500"
          color="black"
          _hover={{ bg: "gray.100", borderColor: "gray.600" }}
        >
          音声認識開始
        </Button>
      </VStack>
    </Box>
  );
};

export default App;
