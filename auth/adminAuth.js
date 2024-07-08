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
    if(res.data.success){
      if(res.data.date){
        await AsyncStorage.setItem('validUntil', res.data.date);
        await AsyncStorage.setItem('levelOfAuthorisation', '2');
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

