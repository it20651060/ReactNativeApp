import React, { useState, useRef } from "react";
import { Animated, TouchableOpacity, Text, StyleSheet } from "react-native";

const UploadButton = ({ onPress }) => {
  // Scale animation value
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateScale = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress && onPress(); // Call the provided onPress function if it exists
  };

  return (
    <TouchableOpacity onPress={animateScale} activeOpacity={1}>
      <Animated.View
        style={[styles.button, { transform: [{ scale: scaleAnim }] }]}
      >
        <Text style={styles.buttonText}>Upload Image</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

//styles of component

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Add some shadow for Android (optional)
    // Shadow properties for iOS (optional)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UploadButton;
