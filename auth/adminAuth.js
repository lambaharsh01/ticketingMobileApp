import {View, Image, Text, Alert} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import baseUri from './urlRefrence';

import { useNavigation } from '@react-navigation/native';

const charterIcon=require('../assets/charterIcon.png');

export default function App(){

  const naviagtion=useNavigation();
  const [status, setStatus]= useState('Fetching your status...');
  
  
  useEffect(()=>{
  
    obtainStatus();
  
  });

async function obtainStatus(){

  let userEmail= await AsyncStorage.getItem('userEmail');
console.log(userEmail)

  axios.get( baseUri+'/api/user/getAdminAuthenticationDate/'+userEmail)
  .then(async(res)=>{
    console.log(res.data)
    if(res.data.success){
      if(res.data.data.validUntil && res.data.data.ticketUploadInterval){
        await AsyncStorage.setItem('validUntil', res.data.data.validUntil);
        await AsyncStorage.setItem('ticketUploadInterval', res.data.data.ticketUploadInterval.toString());
        await AsyncStorage.setItem('levelOfAuthorisation', '2');
        Alert.alert('Admin Authentication Success', `You can generate tickets till ${res.data.data.validUntil} and youll be required to upload your ticket data with the generation of every ${res.data.data.ticketUploadInterval} tickets`,[
          {text: 'OK', onPress: ()=>{ naviagtion.navigate("Home"); }},
        ]);
      }
    }
    
  }).catch(err=>{
    Alert.alert('Something Went Wrong', 'Please try again after some time');
  });


 return 
}

return(
<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
<Image source={charterIcon} style={{height:150, width:150}}/>
<Text>{status}</Text>
</View>
)
}

