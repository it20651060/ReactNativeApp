import React, { useState, useRef } from "react";
import { Animated, TouchableOpacity, Text, View } from "react-native";

const ConfirmationButton = ({ onPress }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity: 1

  const handlePress = () => {
    // Animate over 500 milliseconds
    Animated.timing(fadeAnim, {
      toValue: 0, // Target opacity: 0
      duration: 500, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start(() => onPress());
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity
          onPress={handlePress}
          style={{ backgroundColor: "blue", padding: 10 }}
        >
          <Text style={{ color: "white" }}>Text seems to be similar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ConfirmationButton;
