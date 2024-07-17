import { View, Image, Text, Alert, BackHandler } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseUri from "./urlRefrence";

import { useNavigation } from "@react-navigation/native";

const charterIcon = require("../assets/charterIcon.png");

export default function App() {
  const naviagtion = useNavigation();
  const [status, setStatus] = useState("Fetching your status...");

  useEffect(() => {
    obtainStatus();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  function backAction() {
    Alert.alert("Are you sure?", "Are your sure you want to exit.", [
      { text: "CANCEL", onPress: () => null, style: "cancel" },
      {
        text: "EXIT",
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
    return true;
  }

  async function obtainStatus() {
    let userEmail = await AsyncStorage.getItem("userEmail");

    axios
      .get(baseUri + "/api/user/getAdminAuthenticationDate/" + userEmail)
      .then(async (res) => {
        if (res.data.success) {
          if (res.data.data.validUntil && res.data.data.ticketUploadInterval) {
            await AsyncStorage.setItem("validUntil", res.data.data.validUntil);
            await AsyncStorage.setItem(
              "ticketUploadInterval",
              res.data.data.ticketUploadInterval.toString()
            );
            await AsyncStorage.setItem("levelOfAuthorisation", "2");
            Alert.alert(
              "Admin Authentication Success",
              `You can generate tickets till ${res.data.data.validUntil
                .split("-")
                .reverse()
                .join(
                  "-"
                )} and you wil be required to upload your ticket data with the generation of every ${
                res.data.data.ticketUploadInterval
              } tickets`,
              [
                {
                  text: "OK",
                  onPress: () => {
                    naviagtion.navigate("Home");
                  },
                },
              ]
            );
          }
        } else {
          setStatus("Your status is still pending");
        }
      })
      .catch(async (err) => {
        await AsyncStorage.setItem("levelOfAuthorisation", "0");
        naviagtion.navigate("AuthenticateUserEmail");
        Alert.alert("Something Went Wrong", "Please try again after some time");
      });

    return;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={charterIcon} style={{ height: 150, width: 150 }} />
      <Text>{status}</Text>
    </View>
  );
}
