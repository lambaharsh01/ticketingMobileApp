import {View,ScrollView, StatusBar, TextInput, Text, StyleSheet, BackHandler, Pressable, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useRef } from 'react';


export default function App(){



  function filterStringsBySubstring(strings, substring) {
    const lowerCaseSubstring = substring.toLowerCase();
    return strings.filter(str => str.toLowerCase().includes(lowerCaseSubstring));
  }

  const getArray = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    }catch (error) {
      alert('Something Went Wrong');
    }
  };

const [modalShow, setModalShow]=useState(false);

const [busInitials, setBusInitials]=useState([]);
const [selectedInitial, setSelectedInitial]=useState(Infinity);



const [busColor, setBusColor]=useState(['#F00', '#FFD700', '#0F7', '#4B0', '#D2B48C', '#A52A2A', '#4682B4', '#8B0']);
const [selectedColor, setSelectedColor]=useState(Infinity);



const [busRoutes, setBusRoutes]=useState(['123','234','567','445','334','990','887']);
const [filterBusRoute, setFilterBusRoute]=useState(['123','234','567','445','334','990','887']);
const [selectedBusRoute, setSelectedBusRoute]=useState('');


const [busStops, setBusStops]=useState(['Najafgarh', 'Khaira', 'Delhi gate', '2 sector', 'tuda mandi']);

const [statingStopsFiltered, setStatingStopsFiltered]=useState([]);
const [selectedStartingBusStop, setSelectedStartingBusStop]=useState('');

const [endingStopsFiltered, setEndingStopsFiltered]=useState([]);
const [selectedEndingBusStop, setSelectedEndingBusStop]=useState('');


useEffect(async()=>{
  const initialCode=await getArray('busInitials');
  if(initialCode){
    setBusInitials(initialCode);
  }
  const colorCode=await getArray('busColor');
  if(colorCode){
    setBusColor(colorCode);
  }
  const stops=await getArray('busStops');
  if(stops){
    setBusStops(stops);
  }
  const routes=await getArray('busRoutes');
  if(routes){
    setBusRoutes(routes);
  }
},[]);



return(
<View style={{flex:1, backgroundColor:'pink', paddingTop:100, paddingLeft:50}}>
<Pressable onPress={()=>setModalShow(true)}  style={styles.button} ><Text style={styles.buttonText}>Button</Text></Pressable>  

<Modal 
visible={modalShow}
onRequestClose={()=>setModalShow(false)}
animationType='fade'
style={{flex:1}}
>

<Text style={styles.validationHeaderText}>Validation</Text>  

<ScrollView style={{paddingHorizontal:10}}>
<Text style={styles.validationCheckpoints}>Bus Initial/Starting Code</Text>

<View style={styles.elementFlexBox}>
{busInitials.map((element, index)=>(
  <Pressable style={[styles.selectionButton, selectedInitial===index && styles.selectedButton]} onPress={()=>{setSelectedInitial(index)}}>
  <Text style={styles.buttonText}>{element}</Text>
</Pressable>  
))}
</View>



<Text style={styles.validationCheckpoints}>Bus Color Code</Text>

<View style={styles.elementFlexBox}>
{busColor.map((element, index)=>(
  <Pressable style={[styles.selectionColorPalet,{backgroundColor:element, width:38}, selectedColor===index && styles.selectedColorPalet]} onPress={()=>{setSelectedColor(index)}}>
  <Text style={styles.buttonText}></Text>
</Pressable>  
))}
</View>




<Text style={styles.validationCheckpoints}>Bus Route</Text>
<TextInput style={styles.searchInput} value={selectedBusRoute} onChangeText={(text)=>{
  setSelectedBusRoute(text);
  const filtered = filterStringsBySubstring(busRoutes, text);
  setFilterBusRoute(filtered);
}}/>

<View style={styles.elementFlexBox}>

{filterBusRoute.map((element)=>(
  <Pressable style={[styles.selectionButton]} onPress={()=>{setSelectedBusRoute(element)}}>
  <Text style={styles.buttonText}>{element}</Text>
</Pressable>  
))}
</View>





<Text style={styles.validationCheckpoints}>Starting Stop</Text>
<TextInput style={styles.searchInput} value={selectedStartingBusStop} onChangeText={(text)=>{
  setSelectedStartingBusStop(text);
  const filtered = filterStringsBySubstring(busStops, text);
  setStatingStopsFiltered(filtered);
}}/>

<View style={styles.elementFlexBox}>

{statingStopsFiltered.map((element, index)=>(
  <Pressable style={[styles.selectionButton]} onPress={()=>{setSelectedStartingBusStop(element)}}>
  <Text style={styles.buttonText}>{element}</Text>
</Pressable>  
))}
</View>


<Text style={styles.validationCheckpoints}>Ending Stop</Text>
<TextInput style={styles.searchInput} value={selectedEndingBusStop} onChangeText={(text)=>{
  setSelectedEndingBusStop(text);
  const filtered = filterStringsBySubstring(busStops, text);
  setEndingStopsFiltered(filtered);
}}/>

<View style={styles.elementFlexBox}>
{endingStopsFiltered.map((element, index)=>(
  <Pressable style={[styles.selectionButton]} onPress={()=>{setSelectedEndingBusStop(element)}}>
  <Text style={styles.buttonText}>{element}</Text>
</Pressable>  
))}
</View>


<Pressable onPress={()=>{

let plainText='Please Select ';
let validation=0;

  if(!busInitials[selectedInitial]){
    validation++;
    plainText+='Bus Initials, '
  }
  if(!busColor[selectedColor]){
    validation++;
    plainText+='Bus Color, '
  }
  if(selectedBusRoute.length<2){
    validation++;
    plainText+='Bus Route, '
  }
  if(selectedStartingBusStop.length<2){
    validation++;
    plainText+='Starting Stop, '
  }

  if(selectedEndingBusStop.length<2){
    validation++;
    plainText+='Ending Stop.'
  }

if(validation){
  Alert.alert('Please Check', plainText);
}

}}  style={styles.saveButton} ><Text style={[styles.buttonText, styles.saveButtonText]}>Next</Text></Pressable> 


</ScrollView>


</Modal>

</View>
)

}




































const styles = StyleSheet.create({
saveButtonText:{fontSize:20, color:'black', backgroundColor:'#00adb0', paddingVertical:10, borderRadius:10, color:'white', marginHorizontal:5, marginTop:20},

searchInput:{borderWidth:1, borderRadius:10, marginBottom:8, paddingStart:5},
elementFlexBox:{flexDirection:'row', flexWrap: 'wrap', justifyContent: 'flex-start',},

validationHeaderText:{
  fontSize:20, 
  fontWeight:'bold',
  textAlign: 'center'
},

validationCheckpoints:{
  fontSize:17, 
  fontWeight:'bold',
  marginTop:20,
  marginBottom:10
},



  button: {
    backgroundColor: '#007AFF', // Example button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start', // Align button to the start of the container
  },


  selectedColorPalet: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginHorizontal:5, marginVertical:5,
    alignSelf: 'flex-start',
    borderColor:'gray',
    borderWidth:3,
    width:43
  },

  selectionColorPalet:{
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginHorizontal:5, marginVertical:5,
    alignSelf: 'flex-start'
  },


  selectionButton: {
    backgroundColor: '#EEEDEB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginHorizontal:5, marginVertical:5,
    alignSelf: 'flex-start'
  },

  selectedButton:{
    backgroundColor: 'gray',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginHorizontal:5, marginVertical:5,
    alignSelf: 'flex-start'
  },

  buttonText: {
    // color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});