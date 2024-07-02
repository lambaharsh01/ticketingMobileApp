import {View, Image, StatusBar, TextInput, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import baseUri from './urlRefrence';

import Ionicons from '@expo/vector-icons/Ionicons';

const charterIcon=require('../assets/charterIcon.png');

export default function App(){

  const getArray = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    }catch (error) {
      alert('Something Went Wrong');
    }
  };
  
  const saveArray = async (key, array) => {
    try {
      const jsonValue = JSON.stringify(array);
      await AsyncStorage.setItem(key, jsonValue);
      Alert.alert('Data Saved','Data Saved SuccessFully');
    } catch (error) {
      alert('Something Went Wrong');
    }
  };



useEffect(()=>{
 return;
},[])

const [disabled, setDisabled]=useState(false);

const [process, setProcess]=useState(0);


const [userName, setUserName]=useState('');
const [userEmail, setUserEmail]=useState('');
const [otpEntered, setOtpEntered]=useState('');

function sendOtp(){
setDisabled(true);


setProcess(prevCount=>prevCount+1)
setDisabled(false);
return;

let url=baseUri+'/api/user/userEmailVerification';
let bodyData={userName:userName , userEmail:userEmail};
console.log(bodyData);
  axios.post(url, bodyData)
  .then((res)=>{
    console.log(res);
    setDisabled(false);
  }).catch(err=>{
    console.error(err);
    setDisabled(false);
  }
  )
}
  

function checkOtp(){
  setDisabled(true);

  setProcess(prevCount=>prevCount+1)
  setDisabled(false);
  return;
}


return(
<View style={{flex:1, alignItems:'center'}}>

<View style={{alignItems:'center'}}>
<Image source={charterIcon} style={{height:100, width:100, marginTop:'20%'}}/>
</View>

{(process===0) && <>

<Text style={[styles.inputHeading, {marginTop:'13%'}]}>Enter Your Name</Text>

<View style={styles.inputView}>
<TextInput style={styles.inputStyle} value={userName} onChangeText={(text)=>{setUserName(text)}}></TextInput>
</View>

<Text style={[styles.inputHeading, {marginTop: '10%'}]}>Enter Your Email ID</Text>
<View style={styles.inputView}>
<TextInput style={styles.inputStyle} autoCapitalize="none" value={userEmail} onChangeText={(text)=>{setUserEmail(text)}}></TextInput>
</View>

</>}


{(process===1) && <>

<Text style={[styles.inputHeading, {marginTop:'13%'}]}>Enter Otp</Text>

<View style={styles.inputView}>
<TextInput style={styles.inputStyle} value={otpEntered} onChangeText={(text)=>{setOtpEntered(text)}}></TextInput>
</View>

</>}

{(process===2) && <>

<Text style={[styles.inputHeading, {marginTop:'13%'}]}>Enter</Text>

<View style={styles.inputView}>
<TextInput style={styles.inputStyle} value={otpEntered} onChangeText={(text)=>{setOtpEntered(text)}}></TextInput>
</View>

</>}


<View style={{ position: 'absolute', bottom: 0, marginBottom:10}}>
<Pressable disabled={disabled } onPress={()=>{
 if(process===0)sendOtp();
 if(process===1)checkOtp();

  }}  style={styles.saveButton} >
  <Text style={[styles.buttonText, styles.saveButtonText]}>Proceed</Text>
</Pressable> 
</View>


</View>
)
}

const styles = StyleSheet.create({
 inputHeading:{alignSelf: 'flex-start', marginLeft:'7%', color:'#3055A3', fontSize:15, fontWeight:500},
 inputView:{paddingHorizontal:'7%', flexDirection:'row'},
 inputStyle:{borderWidth:1, paddingVertical:3, borderRadius:5, flex:1, paddingLeft:8},

saveButtonText:{fontSize:19, color:'white', width:120, padding:6, backgroundColor:'#3055A3', borderRadius: 5},
saveButton:{paddingVertical:8, marginBottom:10, borderRadius:6, marginHorizontal:5},
buttonText: {textAlign: 'center'},

})
