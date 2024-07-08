import {View, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';


const charterIcon=require('../assets/charterIcon.png');

export default function App(){

  const naviagtion=useNavigation();
  
  
  useEffect(()=>{

  
    getParameters()
  
  });

async function getParameters(){


  return naviagtion.navigate("UploadTickets");

  let levelOfAuthorisation=await AsyncStorage.getItem('levelOfAuthorisation');
  let validUntil=await AsyncStorage.getItem('validUntil');

  
  let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if(dateRegex.test(validUntil)){
    if(new Date(validUntil) < new Date())
      return naviagtion.navigate("AdminAuth");

    let todayDate = new Date();
    let validUntilDate =new Date(validUntil);
    let timeDifference = Math.abs(validUntilDate - todayDate);
    let daysDifference = Math.ceil(timeDifference / (1000 * 1000 * 60 * 24));

    if(daysDifference<4)
    Alert.alert('Admin Authentication', `${daysDifference===1 ? '1 day': daysDifference+ 'days'} left for admin re authentication`)
  }
  
  // 0/null = not started yet page redirect authenticateUserEmail
  if(!levelOfAuthorisation) return naviagtion.navigate("AuthenticateUserEmail");
  
  // 1= email authentication completed waiting for confirmation by the admin
  if(levelOfAuthorisation===1 || levelOfAuthorisation==='1') 
    return naviagtion.navigate("AdminAuth");
  
  
  // 2= email authentication is completed ready for dashboard and using the app
  if(levelOfAuthorisation===2 || levelOfAuthorisation==='2') 
    return naviagtion.navigate("Home");

 
  // if requested re authorisation dont show the pop up untill date reached

  // when to uploadTickets get over 30 notificationPopUp upload/ later
  // when 35 only upload



  // console.log(await AsyncStorage.getItem('emailId'))

  await AsyncStorage.setItem('emailId', 'ooooooo')
}

return(
<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
<Image source={charterIcon} style={{height:150, width:150}}/>
</View>
)
}

