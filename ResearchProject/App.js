import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import CSHome from "./src/screens/CSHome";
import CS_ScreenshotReport from "./src/screens/CS_ScreenshotReport";
import CS_TextExtraction from "./src/screens/CS_TextExtraction";
import ScreenForTest from "./src/screens/ScreenForTest";
import CS_AI_Checking from "./src/screens/CS_AI_Checking";

//for navigations between screeens
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CSHome">
        <Stack.Screen
          name="CSHome"
          component={CSHome}
          options={{
            headerShown: false, // This will hide the header for the Home screen
          }}
        />
        <Stack.Screen
          name="CS_ScreenshootReport"
          component={CS_ScreenshotReport}
          options={{
            headerShown: false, // This will hide the header for the Home screen
          }}
        />
        <Stack.Screen
          name="CS_TextExtraction"
          component={CS_TextExtraction}
          options={{
            headerShown: false, // This will hide the header for the Home screen
          }}
        />
        <Stack.Screen
          name="CS_AI_Checking"
          component={CS_AI_Checking}
          options={{
            headerShown: false, // This will hide the header for the Home screen
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
