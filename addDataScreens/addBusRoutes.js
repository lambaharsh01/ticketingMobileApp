import {View, ScrollView, StatusBar, TextInput, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

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
  let data=await getArray('busRoutes');
  if(data){
    setBusRoutes(data)
  }
},[])



  

const [busRoutes, setBusRoutes]=useState([])

return(
<View style={{flex:1}}>
<StatusBar backgroundColor='#00adb0' />
<ScrollView>
<Text style={styles.validationHeaderText}>Bus Route Info</Text> 
<Text style={styles.buttonAlignment}>


<Ionicons name="add-circle" size={38} style={[styles.buttonText, styles.fontAsthetics]} onPress={()=>{
  setBusRoutes(prev=>{
    return [...prev, ''];
  })
}} />
</Text>


{busRoutes.map((element, index)=>(
  <View style={{padding:5, flexDirection:'row'}}>

  <TextInput style={styles.inputs} value={element} onChangeText={(text)=>{
setBusRoutes(prevAry=>{
const theArray=[...prevAry];
theArray[index]=text;
return theArray;
    })
    }}/>
<Ionicons name="remove-circle" size={35} style={[styles.buttonText, styles.fontAsthetics, styles.fontAstheticsGray]} onPress={()=>{

setBusRoutes(prev=>{
  let firstHalf=prev.slice(0,index);
  let secondHalf=prev.slice(index+1);
  return[...firstHalf,...secondHalf];
})

}}/>
  </View>
))}


</ScrollView>

<Pressable onPress={()=>{saveArray('busRoutes', busRoutes)}}  style={styles.saveButton} ><Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text></Pressable> 

</View>
)
}


const styles = StyleSheet.create({
saveButtonText:{fontSize:20, color:'white'},
saveButton:{backgroundColor:'#00adb0', paddingVertical:8, marginBottom:10, borderRadius:6, marginHorizontal:5},
inputs:{borderWidth:1, paddingVertical:3, borderRadius:15, flex:1, paddingLeft:8},
buttonAlignment:{textAlign:'right', marginEnd:15, marginTop:10},
fontAsthetics:{fontWeight:'bold', color:'#00adb0'},
fontAstheticsGray:{marginHorizontal:13, color:'#00adb0'},
buttonAsthetics:{backgroundColor:'black', borderRadius:50, textAlign:'center'},

validationHeaderText:{
  marginTop:20,
  fontSize:20, 
  fontWeight:'bold',
  textAlign: 'center'
},

validationCheckpoints:{
  fontSize:15, 
  fontWeight:'bold',
  marginTop:10
},



  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    textAlign: 'center',
  },
});