import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stylesheet/app.scss";
import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

const App = () => {
  const toast = useToast();
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
        toast({
          title: `${folderName}に分類されました`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startSpeechRecongnition = async () => {
    const toastId = toast({
      title: "音声を認識中です...",
      status: "info",
      duration: null, // トーストを自動的に閉じないようにする
      isClosable: false, // 手動で閉じることもできないようにする
    });

    try {
      const response = await axios.get(
        "http://localhost:3001/start-speech-recognition",
        { timeout: 10000 }
      ); // 10秒タイムアウト

      toast.close(toastId);

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
      } else if (
        trimmedVoiceRecognizedText === "コンデンサ" ||
        trimmedVoiceRecognizedText === "コンデンサー"
      ) {
        moveImage("Condenser");
      } else if (
        trimmedVoiceRecognizedText === "IC" ||
        trimmedVoiceRecognizedText === "アイシー"
      ) {
        moveImage("IC");
      } else if (trimmedVoiceRecognizedText === "コネクター") {
        moveImage("Connector");
      } else if (
        trimmedVoiceRecognizedText === "PCB" ||
        trimmedVoiceRecognizedText === "ピーシービー"
      ) {
        moveImage("PCB");
      } else if (trimmedVoiceRecognizedText === "メタル") {
        moveImage("Metal");
      } else {
        toast({
          title: "該当する単語がありませんでした",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error starting speech recognition:", error);

      toast.close(toastId);
      // エラートーストを表示
      toast({
        title: "音声認識に失敗しました",
        description: "もう一度試してください",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Box className="app">
      <Text fontSize="xl" fontWeight="bold" mb={4} margin="40px 0 10px">
        分類対象の画像
      </Text>
      <Box className="app__input-image">
        {imageName && (
          <Image
            src={`http://localhost:3001/images/${imageName}`}
            alt="Current"
            boxSize="sm"
          />
        )}
      </Box>

      <Text
        fontSize="xl"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        margin="60px 0 0"
      >
        ボタンで分類する
      </Text>

      <HStack spacing={4} margin="10px 0 0">
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
        <Text fontSize="xl" fontWeight="bold" mb={4} margin="60px 0 0">
          音声で分類する
        </Text>
        <Text fontSize="md" fontWeight="semibold">
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
