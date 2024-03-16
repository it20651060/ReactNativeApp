import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CS_AI_Checking = ({ route }) => {
  const { extractedText } = route.params;

  useEffect(() => {
    // Call sendTextToBackend when the component mounts
    sendTextToBackend(extractedText);
  }, [extractedText]); // This ensures sendTextToBackend is only called once when the component mounts

  const sendTextToBackend = async (text) => {
    try {
      const response = await fetch("http://192.168.8.121:5000/send-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      const jsonResponse = await response.json();
      console.log("Response from backend:", jsonResponse);
      // Handle the response from the backend as needed
    } catch (error) {
      console.error("Error sending text to backend:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Extracted Text: {extractedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CS_AI_Checking;
