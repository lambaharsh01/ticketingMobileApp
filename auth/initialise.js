import {View, Image, StatusBar, TextInput, Text, Button, StyleSheet, Pressable, Alert } from 'react-native';
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



useEffect(()=>{
 return;
},[])

const [disabled, setDisabled]=useState(false);

const [process, setProcess]=useState(0);


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

const [occupation, setOccupation]=useState(null);
const [occupationDropDown, setOccupationDropdown] = useState(false);
const [occupationItems, setOccupationItems]=useState([{ label:"Student", value:"Student"},
                                                      { label:"Working", value:"Working"},
                                                      { label:"Student + Working", value:"Student + Working"}]);

const [education, setEducation]=useState(null);
const [educationDropDown, setEducationDropdown] = useState(false);
const [educationItems, setEducationItems]=useState([{ label:"High Schooled", value:"High Schooled"},
  { label: "Bachelor's Degree", value: "Bachelor's Degree" },
  { label: "Master's Degree", value: "Master's Degree" },
  { label: "Doctorate Degree", value: "Doctorate Degree" },
  { label: "Professional Certificate", value: "Professional Certificate" },
  { label: "Diploma", value: "Diploma" }
]);

// const [education, setEducation]=useState(null);
// const [educationDropDown, setEducationDropdown] = useState(false);
// const [educationItems, setEducationItems]=useState([{ label:"High Schooled", value:"High Schooled"},
//   { label: "Bachelor's Degree", value: "Bachelor's Degree" },
//   { label: "Master's Degree", value: "Master's Degree" },
//   { label: "Doctorate Degree", value: "Doctorate Degree" },
//   { label: "Professional Certificate", value: "Professional Certificate" },
//   { label: "Diploma", value: "Diploma" }
// ]);

const [dateOfBirth, setDateOfBirth]=useState(new Date());
const [showDate, setShowDate] = useState(false);

const onChange = (event, selectedDate) => {

  console.log
  const currentDate = selectedDate || dateOfBirth;
  setShowDate(false);
  setDateOfBirth(currentDate);
};


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

function saveBasicDetails(){
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
<Text style={[styles.inputHeading, {marginTop:'11%'}]}>Enter Otp</Text>
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
        style={[styles.inputStyle,{backgroundColor:'transparent'}]}/> 
</View>

<Text style={[styles.inputHeading, {marginTop:'17%'}]}>Select Your Ocupation</Text>
<View style={styles.inputView}>
<DropDownPicker
        open={districtDropDown}
        value={district}
        items={districtItems}
        setOpen={setDistrictDropdown}
        setValue={setDistrict}
        setItems={setDistrictItems}
        placeholder="Select District"
        style={[styles.inputStyle,{backgroundColor:'transparent'}]}/> 
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

