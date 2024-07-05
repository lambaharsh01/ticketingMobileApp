import {View, Image, ActivityIndicator, TextInput, Text, Button, BackHandler, StyleSheet, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';



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


  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  
  const [process, setProcess]=useState(0);
  const [isLoading, setIsLoading]=useState(false);


  const [disabled, setDisabled]=useState(false);
  

const [userName, setUserName]=useState('');
const [userEmail, setUserEmail]=useState('');
const [otpEntered, setOtpEntered]=useState('');

const [gender, setGender]=useState(null);
const [genderDropDown, setGenderDropdown] = useState(false);
const [genderItems, setGenderItems]=useState([{ label: 'Male', value: 'Male' },
                                              { label: 'Female', value: 'Female' },
                                              { label: 'Others', value: 'Others' }]);

const [district, setDistrict]=useState(null);
const [districtDropDown, setDistrictDropdown] = useState(false);
const [districtItems, setDistrictItems]=useState([{ label: "Central Delhi", value: "Central Delhi" },
                                                  { label: "East Delhi", value: "East Delhi" },
                                                  { label: "New Delhi", value: "New Delhi" },
                                                  { label: "North Delhi", value: "North Delhi" },
                                                  { label: "North East Delhi", value: "North East Delhi" },
                                                  { label: "North West Delhi", value: "North West Delhi" },
                                                  { label: "Shahdara", value: "Shahdara" },
                                                  { label: "South Delhi", value: "South Delhi" },
                                                  { label: "South East Delhi", value: "South East Delhi" },
                                                  { label: "South West Delhi", value: "South West Delhi" },
                                                  { label: "West Delhi", value: "West Delhi" }]);


const [dateOfBirth, setDateOfBirth]=useState(new Date());
const [showDate, setShowDate] = useState(false);

const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || dateOfBirth;
  setShowDate(false);
  setDateOfBirth(currentDate);
};


function sendOtp(){

if(userName.length<3)
  return Alert.alert("Can't Proceed", 'Please enter your name.');

if(userEmail.length<3)
  return Alert.alert("Can't Proceed", 'Please enter your email');

// setDisabled(true);
setIsLoading(true);

  axios.post( baseUri+'/api/user/userEmailVerification', {userName , userEmail})
  .then((res)=>{
    setProcess(prevCount=>prevCount+1);
    setIsLoading(false);
  }).catch(err=>{
    Alert.alert('Something Went Wrong', 'Please try again after some time');
  });
}

function checkOtp(){

  if(otpEntered.length!==4)
    return Alert.alert("Can't Proceed", 'Please enter correct OTP');

  setIsLoading(true);

  axios.post( baseUri+'/api/user/varifyEmail', {otp:otpEntered , userEmail})
  .then((res)=>{
    setProcess(prevCount=>prevCount+1);
    setIsLoading(false);
    setOtpEntered('')
  }).catch(err=>{
    Alert.alert('Something Went Wrong', 'Please try again after some time');
    setOtpEntered('')
  });
}


function saveBasicDetails(){

  if(!gender)
    return Alert.alert("Can't Proceed", 'Please select your gender');
  
  if(!district)
    return Alert.alert("Can't Proceed", 'Please select your district');


  const selectedYear = new Date(dateOfBirth).getFullYear();
  const currentYear = new Date().getFullYear();

  if((currentYear-10) < selectedYear)
    return Alert.alert("Can't Proceed", 'Please select your date of birth');
  
  setIsLoading(true);

  axios.post( baseUri+'/api/user/addUserDetails/'+userEmail, {gender, district, dateOfBirth:formatDate(dateOfBirth)})
  .then((res)=>{
    
    if(!res?.data?.success ?? null)
      return Alert.alert('Something Went Wrong', !res?.data?.message ?? 'Please try again after some time');
    setProcess(prevCount=>prevCount+1);
    setIsLoading(false);
  }).catch(err=>{
    console.log(err)
    setIsLoading(false);
    Alert.alert('Something Went Wrong', 'Please try again after some time'+err);
  });
}



  
useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  return () => backHandler.remove();
}, []);

function backAction(){

    Alert.alert("Are you sure?", "All the changes will be lost if you exit now.", [
      {text: "CANCEL", onPress: () => null, style: "cancel"},
      { text: "EXIT", onPress: () => {
        setUserEmail('');
        setUserName('');
        setOtpEntered('');
        
        setGender(null);
        setDistrict(null);
        setDateOfBirth(new Date());
        setProcess(0);
        setIsLoading(false);
        BackHandler.exitApp();
      }}
    ]);
  return true; 

};

return(
<View style={{flex:1, alignItems:'center'}}>

{isLoading && (
      <View style={{marginTop:'100%'}}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Processing Request...</Text>
      </View>
)}


{!isLoading && (
<>
<View style={{alignItems:'center'}}>
<Image source={charterIcon} style={{height:100, width:100, marginTop:'20%'}}/>
</View>

{(process===0) && <>

<Text style={[styles.inputHeading, {marginTop:'11%'}]}>Enter Your Name</Text>

<View style={styles.inputView}>
<TextInput style={styles.inputStyle} value={userName} onChangeText={(text)=>{setUserName(text)}}/>
</View>

<Text style={[styles.inputHeading, {marginTop: '17%'}]}>Enter Your Email ID</Text>
<View style={styles.inputView}>
<TextInput style={styles.inputStyle} autoCapitalize="none" value={userEmail} onChangeText={(text)=>{setUserEmail(text)}}/>
</View>

</>}

{(process===1) && <>
<Text style={[styles.inputHeading, {marginTop:'11%'}]}>Enter Otp Sent On Your Email</Text>
<View style={styles.inputView}>
<TextInput style={styles.inputStyle} value={otpEntered} onChangeText={(text)=>{setOtpEntered(text)}}/>
</View>
</>}

{(process===2) && <>
<Text style={[styles.inputHeading, {marginTop:'11%'}]}>Select Your Gender</Text>
<View style={styles.inputView}>
<DropDownPicker
        open={genderDropDown}
        value={gender}
        items={genderItems}
        setOpen={setGenderDropdown}
        setValue={setGender}
        setItems={setGenderItems}
        placeholder="Select Gender"
        style={[styles.inputStyle,{backgroundColor:'transparent'}]} />
</View>

<Text style={[styles.inputHeading, {marginTop:'17%'}]}>Select Your District</Text>
<View style={styles.inputView}>
<DropDownPicker
        open={districtDropDown}
        value={district}
        items={districtItems}
        setOpen={setDistrictDropdown}
        setValue={setDistrict}
        setItems={setDistrictItems}
        placeholder="Select District"
        style={[styles.inputStyle,{backgroundColor:'transparent', zIndex:1}]}/> 
</View>

<Text style={[styles.inputHeading, {marginTop:'17%'}]}>Select Your Date Of Birth</Text>
<View style={styles.inputView}>
<Pressable onPress={()=>{setShowDate(true)}} style={styles.inputStyle}>
<TextInput style={{border:'none', height:'100%'}} value={dateOfBirth.toLocaleDateString()} editable={false}/>
</Pressable>
{showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateOfBirth}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={(onChange)}/>
)}
</View>




 
</>}


<View style={{ position: 'absolute', bottom: 0, marginBottom:10}}>
<Pressable disabled={disabled} onPress={()=>{
 if(process===0) return sendOtp();
 if(process===1) return checkOtp();
 if(process===2) return saveBasicDetails();

  }}  style={styles.saveButton} >
  <Text style={[styles.buttonText, styles.saveButtonText]}>Proceed</Text>
</Pressable> 
</View>

</>
)}

</View>
)
}

const styles = StyleSheet.create({
 inputHeading:{alignSelf: 'flex-start', marginLeft:'7%', color:'#3055A3', fontSize:15, fontWeight:500},
 inputView:{paddingHorizontal:'7%', flexDirection:'row'},
 inputStyle:{borderWidth:1, paddingVertical:3, borderRadius:5, flex:1, paddingLeft:8, height:47},

saveButtonText:{fontSize:19, color:'white', width:120, padding:6, backgroundColor:'#3055A3', borderRadius: 5},
saveButton:{paddingVertical:8, marginBottom:10, borderRadius:6, marginHorizontal:5},
buttonText: {textAlign: 'center'},






})

