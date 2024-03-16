import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  Button,
  Alert,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { genStyles } from "../styles/general";
import { styles } from "../styles/CSHome";

const CSHome = ({ navigation }) => {
  // Handler for the first button
  const onImageReportButtonPress = () => {
    Alert.alert("First Button", "You pressed the first button!");
    navigation.navigate("CS_ScreenshootReport");
  };

  // Handler for the second button
  const onManualReportButtonPress = () => {
    Alert.alert("Second Button", "You pressed the second button!");
  };

  //animation to heading
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const positionAnim = useRef(new Animated.Value(0)).current;
  const [animationDone, setAnimationDone] = useState(false); // New state to track animation completion

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(positionAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationDone(true)); // Set animationDone to true after animation
    });
  }, [fadeAnim, positionAnim]);

  return (
    <ImageBackground
      source={require("../res/images/CSHome/CSHomeBackground.jpg")}
      style={genStyles.backgroundImage}
    >
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Animated.Text
            style={[
              styles.heading,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: positionAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -250],
                    }),
                  },
                ],
              },
            ]}
          >
            Coral incident reporting unit
          </Animated.Text>
        </View>

        {animationDone && (
          <View>
            <TouchableOpacity
              onPress={onImageReportButtonPress}
              style={styles.button}
            >
              <Text style={styles.text}>Report with Image/Screenshot</Text>
            </TouchableOpacity>

            <View style={styles.space} />

            <TouchableOpacity
              onPress={onManualReportButtonPress}
              style={styles.button}
            >
              <Text style={styles.text}>Manual case report</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default CSHome;
