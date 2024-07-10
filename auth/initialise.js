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

const getArray = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : [];
    }catch (error) {
      Alert.alert('Something Went Wrong');
    }
  };

async function getParameters(){

  let ticketUploadInterval=Number(await AsyncStorage.getItem('ticketUploadInterval') ?? 30) ;
  
  let ticketRecords=await getArray('ticketRecords');
  ticketRecords=ticketRecords.length;

  if((ticketUploadInterval-ticketRecords)<1)
    return naviagtion.navigate("UploadTickets");

  if((ticketUploadInterval-ticketRecords)<4)
    Alert.alert('Ticket Limit', `${(ticketUploadInterval-ticketRecords)} more tickets can be taken before upload`);


  //page redirection
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
    Alert.alert('Admin Authentication', `${daysDifference===1 ? '1 day': daysDifference+ 'days'} left for admin Re-authentication`);
  }
  
  if(!levelOfAuthorisation) return naviagtion.navigate("AuthenticateUserEmail");
  
  if(levelOfAuthorisation===1 || levelOfAuthorisation==='1') 
    return naviagtion.navigate("AdminAuth");
  
    if(levelOfAuthorisation===2 || levelOfAuthorisation==='2') 
    return naviagtion.navigate("Home");




}

return(
<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
<Image source={charterIcon} style={{height:150, width:150}}/>
</View>
)
}

