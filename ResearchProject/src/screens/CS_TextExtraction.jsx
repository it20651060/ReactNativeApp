import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { styles } from "../styles/CS_TextExtraction";
import { useNavigation } from "@react-navigation/native";
import UploadButton from "../components/CS_uploadButton";
import ConfirmationButton from "../components/CS_confirmationButton";

function CS_TextExtraction({ route }) {
  const { imageUri } = route.params;
  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation(); // Use the useNavigation hook to get access to navigation

  const performOCR = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg", // or the correct image mime type of your image
      name: "image.jpg",
    });

    try {
      const response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        headers: {
          apiKey: "K87395078788957",
        },
        body: formData,
      });
      const responseJson = await response.json();

      if (responseJson.OCRExitCode === 1) {
        const extractedText = responseJson.ParsedResults[0].ParsedText;
        setExtractedText(extractedText);
      } else {
        console.error("OCR Error: ", responseJson);
        setExtractedText("Failed to extract text. Please try again.");
      }
    } catch (error) {
      console.error("Fetch Error: ", error);
      setExtractedText("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    performOCR();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.extractedText}>{extractedText}</Text>
          <View>
            <ConfirmationButton
              onPress={() =>
                navigation.navigate("CS_AI_Checking", { extractedText })
              }
              title="Select Image"
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

export default CS_TextExtraction;
