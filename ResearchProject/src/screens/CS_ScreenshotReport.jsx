import React, { useState, useRef, useEffect } from "react";
import { View, Alert, Image, Modal, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker"; // expo-image-picker
import UploadButton from "../components/CS_uploadButton";
import { styles } from "../styles/CS_ScreenshotReport";
import { SafeAreaView } from "react-native-safe-area-context";

const CS_ScreenshotReport = () => {
  //image display purpose
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const navigation = useNavigation(); // Use the useNavigation hook to get access to navigation

  //permision to access the media library
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };

    requestPermissions();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      // Access the first item in the assets array
      const uri = result.assets[0].uri;
      setImageUri(uri);
      console.log(uri); // This should now log the correct URI
      Alert.alert("Image Selected", uri);
    }
  };

  return (
    <>
      <SafeAreaView
        style={[
          styles.backgroundContainer,
          { backgroundColor: imageUri ? "black" : "white" },
        ]}
      >
        <View style={styles.container}>
          {imageUri ? (
            <Image
              style={styles.tinyLogo}
              source={require("../res/images/CS_ScreenshotReport/imageloaded.gif")}
            />
          ) : (
            //add black background color to here
            <Image
              style={styles.tinyLogo}
              source={require("../res/images/CS_ScreenshotReport/imageupload.png")}
            />
          )}
        </View>
        <View style={styles.uploadButton}>
          <UploadButton onPress={pickImage} title="Select Image" />
        </View>
        {imageUri && (
          <>
            <View style={styles.uploadButton}>
              {/* Button to open the modal */}
              <Button
                onPress={() => setModalVisible(true)}
                title="Display Uploaded Image"
              />
            </View>
            {/* New Button to navigate to the ImageView screen */}
            <View style={styles.uploadButton}>
              <Button
                onPress={() =>
                  navigation.navigate("CS_TextExtraction", { imageUri })
                }
                title="Extract Text From Image!"
              />
            </View>
          </>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredViewStyle}>
            <View style={styles.modalViewStyle}>
              <Image
                source={{ uri: imageUri }}
                style={{ width: 200, height: 200 }} // Adjust the size as needed
                resizeMode="contain"
              />
              <Button
                title="Close"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default CS_ScreenshotReport;
