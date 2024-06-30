import {View, ScrollView, StatusBar, TextInput, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App(){

const [fontSizeTicket, setFontSizeTicket]=useState('0');
const [fontSizeAllTickets, setFontSizeAllTickets]=useState('0');
const [fontSizeTransportDeptHeading, setFontSizeTransportDeptHeading]=useState('0');
const [fontSizeSectionHeadings, setFontSizeSectionHeadings]=useState('0');
const [fontSizeSectionContent, setFontSizeSectionContent]=useState('0');
const [fontSizeArrival, setFontSizeArrival]=useState('0');

const [verticalSpacing, setVerticalSpacing]=useState('0');

const getValue = async (key) => {
try {
    const stringValue = await AsyncStorage.getItem(key);
    return isNaN(stringValue)? 0 : Number(stringValue);
}catch (error) {
    alert('Something Went Wrong');
}};

useEffect(async()=>{

    async function getStringVal(key){
        
        let value=await getValue(key);
        if(isNaN(value))
        return '0';

        return JSON.stringify(value);
    }

    setFontSizeTicket(await getStringVal('Ticket'));
    setFontSizeAllTickets(await getStringVal('AllTickets'));
    setFontSizeTransportDeptHeading(await getStringVal('TransportDeptHeading'));
    setFontSizeSectionHeadings(await getStringVal('SectionHeadings'));
    setFontSizeSectionContent(await getStringVal('SectionContent'));
    setFontSizeArrival(await getStringVal('Arrival'));
    setVerticalSpacing(await getStringVal('VerticalSpacing'));
}, []);
  
const saveValue = async (key, value) => {
try {
    await AsyncStorage.setItem(key, value);
} catch (error) {
    alert('Something Went Wrong');
}};

async function validateAndSave(){

    await saveValue('Ticket', fontSizeTicket.toString());
    await saveValue('AllTickets',fontSizeAllTickets.toString());
    await saveValue('TransportDeptHeading', fontSizeTransportDeptHeading.toString());
    await saveValue('SectionHeadings',fontSizeSectionHeadings.toString());
    await saveValue('SectionContent',fontSizeSectionContent.toString());
    await saveValue('Arrival',fontSizeArrival.toString());
    await saveValue('VerticalSpacing',verticalSpacing.toString());

    alert('Data Saved Successfully!')
}

const [showInfo, setShowInfo]=useState(false);

return(
   
<View style={{flex:1}}>
<StatusBar backgroundColor='#00adb0' />
<ScrollView>
<Text style={styles.validationHeaderText}>Ticket Page Basic Styling</Text>

<View style={{padding:8}}>
{!showInfo && (
<Pressable key='infoIcon' onPress={()=>{setShowInfo(!showInfo)}}>
    <Text><Ionicons size={25} style={{color:'orange'}} name="information-circle-outline"/></Text>
</Pressable>
)}  
{showInfo && (
<Pressable key='fullInfo' onPress={()=>{setShowInfo(!showInfo)}}>
<View style={{borderWidth:1, padding:8, borderRadius:15, borderColor:'orange'}}>
<Text style={styles.info}>
    <Text style={{fontWeight:500, fontSize:15}}>Info: </Text>
    Because of device resposiveness issues in exceptional cases the ticket page can be modified from here to fit the device screen perfectly/ close to perfectly.</Text>
<Text style={styles.info}>Here you can manupulate the font size and vertical spacing between the elements inside of ticket content/info Section on the ticket page.</Text>
<Text style={styles.info}>Changing the font size is easy concidering the genral font size is what you can see on the ticket page by default now you can either make it bigger by keeping the Number in the inputs to be positive (i.e: 1, 10, 0.3, 2.4) or make them smaller by giving them a negative value (i.e. -5, -0.1, -3.2) sae rules apply on the vertical spacing.</Text>

</View>
</Pressable>
)}
</View>



<Text style={styles.sectionHeading}>Font Size Section</Text>
 
<View style={styles.rowContainer}>
<Text style={[{fontWeight:500}, styles.rowHeading]}>Page Heading (Ticket)</Text>
<TextInput style={styles.inputs} keyboardType='numeric' value={fontSizeTicket} onChangeText={(text)=>{setFontSizeTicket(text)}} defaultValue={fontSizeTicket}/>
</View>

<View style={styles.rowContainer}>
<Text style={[{fontWeight:500}, styles.rowHeading]}>Page Redirection (All Tickets)</Text>
<TextInput style={styles.inputs} keyboardType='numeric' value={fontSizeAllTickets} onChangeText={(text)=>{setFontSizeAllTickets(text)}}/>
</View>

<View style={styles.rowContainer}>
<Text style={[{fontWeight:500}, styles.rowHeading]}>Main Heading Central Container</Text>
<Text style={[{fontWeight:500}, styles.rowHeading]}>(Transport Dept.)</Text>
<TextInput style={styles.inputs} keyboardType='numeric' value={fontSizeTransportDeptHeading} onChangeText={(text)=>{setFontSizeTransportDeptHeading(text)}}/>
</View>

<View style={styles.rowContainer}>
<Text style={[{fontWeight:500}, styles.rowHeading]}>Ticket Info Headings</Text>
<TextInput style={styles.inputs} keyboardType='numeric' value={fontSizeSectionHeadings} onChangeText={(text)=>{setFontSizeSectionHeadings(text)}}/>
</View>

<View style={styles.rowContainer}>
<Text style={[{fontWeight:500}, styles.rowHeading]}>Ticket Info Content</Text>
<TextInput style={styles.inputs} keyboardType='numeric' value={fontSizeSectionContent} onChangeText={(text)=>{setFontSizeSectionContent(text)}}/>
</View>

<View style={styles.rowContainer}>
<Text style={[{fontWeight:500}, styles.rowHeading]}>Bottom Info (Arival)</Text>
<TextInput style={styles.inputs} keyboardType='numeric' value={fontSizeArrival} onChangeText={(text)=>{setFontSizeArrival(text)}}/>
</View>


<Text style={[styles.sectionHeading, {marginTop:15}]}>Vertical Spacing Section</Text> 

<View style={styles.rowContainer}>
<Text style={[{fontWeight:500}, styles.rowHeading]}>Average Vertical Spacing</Text>
<TextInput style={styles.inputs} keyboardType='numeric' value={verticalSpacing} onChangeText={(text)=>{ setVerticalSpacing(text)}}/>
</View>

<View style={{marginBottom:40}}></View>

</ScrollView>

<Pressable onPress={()=>{validateAndSave()}}  style={styles.saveButton} ><Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text></Pressable> 

</View> 
)
}


const styles = StyleSheet.create({
saveButtonText:{
    fontSize:20, 
    color:'white'
},

saveButton:{
    backgroundColor:'#00adb0', 
    paddingVertical:8, 
    marginBottom:10, 
    borderRadius:6, 
    marginHorizontal:5
},

inputs:{
    borderWidth:1, 
    paddingVertical:3, 
    borderRadius:15, 
    flex:1, 
    paddingLeft:8
},

validationHeaderText:{
  marginTop:20,
  fontSize:20, 
  fontWeight:'bold',
  textAlign: 'center',
  marginBottom:15
},
sectionHeading:{
    fontSize:17,
    fontWeight:'bold',
    textAlign: 'center',
    marginBottom:10
},
rowContainer:{
    padding:5, 
    marginBottom:5,
    textAlign: 'center'
},
rowHeading:{
    fontSize:16,  
    marginBottom:5, 
    paddingLeft:7
},

info:{
    color:'orange', 
    fontSize:12,
    marginBottom:5
},

  buttonText: {
    textAlign: 'center',
  },
});