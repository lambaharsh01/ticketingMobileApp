import {View, Image, StatusBar, TextInput, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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



useEffect(async()=>{
 
},[])


const [userName, setUserName]=useState('');
const [userEmail, setUserEmail]=useState('');
  


return(
<View style={{flex:1, alignItems:'center'}}>

<View style={{alignItems:'center'}}>
<Image source={charterIcon} style={{height:100, width:100, marginTop:'20%'}}/>
</View>

<Text style={[styles.inputHeading, {marginTop:'13%'}]}>Enter Your Name</Text>

<View style={styles.inputView}>
<TextInput style={styles.inputStyle} value={userName} onChange={setUserName}></TextInput>
</View>

<Text style={[styles.inputHeading, {marginTop: '10%'}]}>Enter Your Email ID</Text>
<View style={styles.inputView}>
<TextInput style={styles.inputStyle} value={userEmail} onChangeText={(text)=>{setUserEmail(text.toLocaleLowerCase())}}></TextInput>
</View>

<View style={{ position: 'absolute', bottom: 0, marginBottom:10}}>
<Pressable onPress={()=>{}}  style={styles.saveButton} >
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
