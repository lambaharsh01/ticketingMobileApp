import {View, ActivityIndicator, TextInput, Text, BackHandler, StyleSheet, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import baseUri from './urlRefrence';

const charterIcon=require('../assets/charterIcon.png');

export default function App(){

  const naviagtion=useNavigation();

  const [disabled, setDisabled]=useState(false);
  const [uploading, setUploading]=useState(false);

  const [uploadingDataMessage, setUploadingDataMessage]=useState('Uplaoding Data...');

  async function uploadData(){
    setUploading(true);

    setTimeout(()=>{
        setUploadingDataMessage('It might take a while...');
        setTimeout(()=>{
            setUploadingDataMessage('Uplaoding Data...');
                setTimeout(()=>{
                    setUploadingDataMessage('Almost there...');
                }, 5000)
        }, 2000);
    }, 1500);
    
  }

return(
<View style={{flex:1, alignItems:'center', justifyContent:'center', alignItems:'center'}}>
{ !uploading && (
    <>
    <Pressable disabled={disabled} onPress={()=>{uploadData()}}  style={styles.saveButton} >
    <Text style={[styles.buttonText, styles.saveButtonText]}>Upload Data</Text>
    </Pressable>
    <Text style={{fontSize:9.5, textAlign:'center'}}>This process is to only use your</Text>
    <Text style={{fontSize:9.5, textAlign:'center'}}>ticket data for analytical purpose</Text>
    </>
)}
{uploading && (

<View style={{}}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text>{uploadingDataMessage}</Text>
</View>
      )}
</View>
)
}

const styles = StyleSheet.create({

saveButtonText:{fontSize:19, color:'white', width:'60%', padding:10, backgroundColor:'#3055A3', borderRadius: 5},
saveButton:{paddingVertical:8, marginBottom:10, borderRadius:6, marginHorizontal:5},
buttonText: {textAlign: 'center'},

})

