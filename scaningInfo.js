import {View, ScrollView, StatusBar, TextInput, Text, StyleSheet, BackHandler, Pressable, Modal, Alert, Switch } from 'react-native';
import { useState, useEffect, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
// import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App(){

const naviagtion=useNavigation()

useEffect(async() => {

      // const { status } = await Camera.requestPermissionsAsync();
      // setHasPermission(status === 'granted');
      setHasPermission(true);

  const backAction = () => {

      setTextAtraHeight('40%');

      if(inputs[0].current){
        inputs[0].current.blur();
      }
      if(inputs[1].current){
        inputs[1].current.blur();
      }
      if(inputs[2].current){
        inputs[2].current.blur();
      }
      if(inputs[3].current){
        inputs[3].current.blur();
      }
      
    };
  const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction);
  return () => {backHandler.remove();}
}, []);








// QR CODE
// QR CODE
const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
// const cameraRef = useRef(null);

const handleBarCodeScanned = ({ type, data }) => {
  setScanned(true);

  if(data.length===4){

  }else{
    Alert.alert('Invalid QR', `QR should contain 4 digits this contains ${data.length}, Do you want to continue?`,[{text:'Continue', 
    onPress:()=>{
      setQrValue([data[0]|| 0, data[1]|| 0, data[2]|| 0, data[3]|| 0]);
      setModalShow(true);
    }},{text:'Cancel', onPress:()=>{setQrValue(['','','','']);  setScanned(false);}}, ])
   
  }
};

// if (hasPermission === null) {
//   return <View />;
// }
// if (hasPermission === false) {
//   return <Text>No access to camera</Text>;
// }

// QR CODE
// QR CODE



const [textAtraHeight, setTextAtraHeight]=useState('40%');

const [qrValue, setQrValue]=useState(['','','','']);

const inputs = Array.from({ length: 4 }, (_, i) => useRef(null));

function handleTextChange0({nativeEvent}){setInputValues(nativeEvent.key, 0)}
function handleTextChange1({nativeEvent}){setInputValues(nativeEvent.key, 1)}
function handleTextChange2({nativeEvent}){setInputValues(nativeEvent.key, 2)}
// function handleTextChange3({nativeEvent}){setInputValues(nativeEvent.key, 3)}








function setInputValues(value, index) {
  setQrValue(prevValues => {
    const updatedValues = [...prevValues];
    if (value === 'Backspace') {
      updatedValues[index] = '';
      if (index > 0) {
        inputs[index - 1].current.focus();
      }
    } else {
      updatedValues[index] = value;
      if (index < 3) {
        inputs[index + 1].current.focus();
      }
    }
    return updatedValues;
  });
}



async function saveArray(key, array){
  try {
    const jsonValue = JSON.stringify(array);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    alert('Something Went Wrong');
  }
};


// VALIDATION MODAL
// VALIDATION MODAL

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


const [busColor, setBusColor]=useState([]);
const [selectedColor, setSelectedColor]=useState(Infinity);



const [busRoutes, setBusRoutes]=useState([]);
const [filterBusRoute, setFilterBusRoute]=useState([]);
const [selectedBusRoute, setSelectedBusRoute]=useState('');


const [busStops, setBusStops]=useState([]);

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
setStatingStopsFiltered(stops);
setEndingStopsFiltered(stops);
}
const routes=await getArray('busRoutes');
if(routes){
  setBusRoutes(routes);
  setFilterBusRoute(routes)
}
setModalShow(false);
setQrValue(["","","",""]);
},[]);


// VALIDATION MODAL
// VALIDATION MODAL




const [ticketFare, setTicketFare]=useState('₹10');
const [ticketDiscount, setTicketDIscount]=useState(true);
const [ticketDiscountedFare, setTicketDiscountedFare]=useState('₹9');
const [ticketCount, setTicketCount]=useState('1');


return(
  <View>
  <StatusBar backgroundColor='#00adb0' />
  <View style={styles.mainView}>
  <View style={styles.container}>
      {/* <Camera
        style={[StyleSheet.absoluteFillObject, { height: '70%' }]}

        type={Camera.Constants.Type.back}
        ref={cameraRef}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      /> */}
      {scanned && <Text style={styles.scanText}></Text>}
    </View>

  </View>

  <View style={[styles.scanerView,{  height:textAtraHeight}]}>

    <Ionicons name="remove" size={75} style={styles.topDashIcon}/>
    <Text style={styles.mainBoldTextTop}>Enter Bus Number (Last 4 digits)</Text>
    <Text style={styles.mainNormalText}>Like 1234 for DL 1PC 1234</Text>
    <View style={styles.textMainDiv}>

<View style={{flexDirection:'row'}}>
      <View style={styles.textView}>
      <TextInput value={qrValue[0]} ref={inputs[0]} keyboardType='numeric' onKeyPress={handleTextChange0} style={styles.textInputs} onFocus={()=>setTextAtraHeight('80%')} />
      </View>
      <View style={styles.textView}>
      <TextInput value={qrValue[1]} ref={inputs[1]} keyboardType='numeric' onKeyPress={handleTextChange1} style={styles.textInputs} onFocus={()=>setTextAtraHeight('80%')}/>
      </View>
      <View style={styles.textView}>
      <TextInput value={qrValue[2]} ref={inputs[2]} keyboardType='numeric' onKeyPress={handleTextChange2} style={styles.textInputs} onFocus={()=>setTextAtraHeight('80%')} />
      </View>
      <View style={styles.textView}>
      <TextInput value={qrValue[3]} ref={inputs[3]} keyboardType='numeric' onKeyPress={({nativeEvent})=>{setInputValues(nativeEvent.key, 3)
        /*handleTextChange3*/
        if(nativeEvent.key!=='Backspace'){
          setModalShow(true);
        }}} onChange={()=>{}} style={styles.textInputs} onFocus={()=>setTextAtraHeight('80%')}/>
      </View>
</View>

    </View>
  </View>



{/* VALIDATION MODAL */}
{/* VALIDATION MODAL */}
{/* VALIDATION MODAL */}


<Modal 
visible={modalShow}
onRequestClose={()=>setModalShow(false)}
animationType='fade'
style={{flex:1}}
>

<Text style={modalStyles.validationHeaderText}>Validation</Text>  

<ScrollView style={{paddingHorizontal:10}}>
<Text style={modalStyles.validationCheckpoints}>Bus Initial/Starting Code</Text>

<View style={modalStyles.elementFlexBox}>
{busInitials.map((element, index)=>(
  <Pressable key={'initials'+index} style={[modalStyles.selectionButton, selectedInitial===index && modalStyles.selectedButton]} onPress={()=>{setSelectedInitial(index)}}>
  <Text style={modalStyles.buttonText}>{element}</Text>
</Pressable>  
))}
</View>



<Text style={modalStyles.validationCheckpoints}>Bus Color Code</Text>

<View style={modalStyles.elementFlexBox}>
{busColor.map((element, index)=>(
  <Pressable key={'color'+index} style={[modalStyles.selectionColorPalet,{backgroundColor:element, width:38}, selectedColor===index && modalStyles.selectedColorPalet]} onPress={()=>{setSelectedColor(index)}}>
  <Text style={modalStyles.buttonText}></Text>
</Pressable>  
))}
</View>




<Text style={modalStyles.validationCheckpoints}>Bus Route</Text>
<TextInput style={modalStyles.searchInput} value={selectedBusRoute} onChangeText={(text)=>{
  setSelectedBusRoute(text);
  const filtered = filterStringsBySubstring(busRoutes, text);
  setFilterBusRoute(filtered);
}}/>

<View style={modalStyles.elementFlexBox}>

{filterBusRoute.map((element, index)=>(
  <Pressable key={'route'+index} style={[modalStyles.selectionButton]} onPress={()=>{setSelectedBusRoute(element)}}>
  <Text style={modalStyles.buttonText}>{element}</Text>
</Pressable>  
))}
</View>





<Text style={modalStyles.validationCheckpoints}>Starting Stop</Text>
<TextInput style={modalStyles.searchInput} value={selectedStartingBusStop} onChangeText={(text)=>{
  setSelectedStartingBusStop(text);
  const filtered = filterStringsBySubstring(busStops, text);
  setStatingStopsFiltered(filtered);
}}/>

<View style={modalStyles.elementFlexBox}>

{statingStopsFiltered.map((element, index)=>(
  <Pressable key={'startingStop'+index} style={[modalStyles.selectionButton]} onPress={()=>{setSelectedStartingBusStop(element)}}>
  <Text style={modalStyles.buttonText}>{element}</Text>
</Pressable>  
))}
</View>


<Text style={modalStyles.validationCheckpoints}>Ending Stop</Text>
<TextInput style={modalStyles.searchInput} value={selectedEndingBusStop} onChangeText={(text)=>{
  setSelectedEndingBusStop(text);
  const filtered = filterStringsBySubstring(busStops, text);
  setEndingStopsFiltered(filtered);
}}/>

<View style={modalStyles.elementFlexBox}>
{endingStopsFiltered.map((element, index)=>(
  <Pressable key={'endingStop'+index} style={[modalStyles.selectionButton]} onPress={()=>{setSelectedEndingBusStop(element)}}>
  <Text style={modalStyles.buttonText}>{element}</Text>
</Pressable>  
))}
</View>


<Text style={modalStyles.validationCheckpoints}>Ticket Fare</Text>
<TextInput style={modalStyles.searchInput} value={ticketFare} onChangeText={setTicketFare}/>


<View style={{flexDirection:'row', justifyContent:'space-between'}}>
<Text style={modalStyles.validationCheckpoints}>Ticket Discount?</Text>
<Switch value={ticketDiscount} onValueChange={()=>{setTicketDIscount(!ticketDiscount)}} style={{marginTop:12}} />
</View>

<Text style={modalStyles.validationCheckpoints}>Ticket Discounted Fare</Text>
{ticketDiscount && (
<TextInput style={modalStyles.searchInput} value={ticketDiscountedFare} onChangeText={setTicketDiscountedFare}/>
)}
{!ticketDiscount && (
<Text>N/A</Text>
)}



<Text style={modalStyles.validationCheckpoints}>Number of Tickets</Text>
<TextInput style={modalStyles.searchInput} value={ticketCount} onChangeText={setTicketCount}/>



<Pressable onPress={async()=>{

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
}else{











  let history=await getArray('ticketHistory');
  let ary=[]
  if(history){
    ary=history;
  }
  if(ary.length>9){
    ary.shift();
  }

  ary.push({
  busNumber:busInitials[selectedInitial]+qrValue.join(''),
  backgroundColor:busColor[selectedColor],
  busRoute:selectedBusRoute,
  startingStop:selectedStartingBusStop,
  endingBusStop:selectedEndingBusStop,
  ticketPrice:ticketFare,
  discount:ticketDiscount,
  discountedPrice:ticketDiscountedFare,
  ticketCount:ticketCount,
  currentDate:new Date()
  });

  
  await saveArray('ticketHistory', ary);





naviagtion.navigate("Ticket", {busNumber:busInitials[selectedInitial]+qrValue.join(''),
  backgroundColor:busColor[selectedColor],
  busRoute:selectedBusRoute,
  startingStop:selectedStartingBusStop,
  endingBusStop:selectedEndingBusStop,
  ticketPrice:ticketFare,
  discount:ticketDiscount,
  discountedPrice:ticketDiscountedFare,
  ticketCount:ticketCount,
  currentDate:new Date()
})








}

}}  style={modalStyles.saveButton}><Text style={[modalStyles.buttonText, modalStyles.saveButtonText]}>Next</Text></Pressable> 


</ScrollView>


</Modal>


{/* VALIDATION MODAL */}
{/* VALIDATION MODAL */}
{/* VALIDATION MODAL */}





</View>
)
}


const styles=StyleSheet.create({
  mainView:{
    height:'100%',
    position:'relative'
  },
  
  scanerView:{
    position:'absolute',
    bottom:0,
    paddingTop:0,
    backgroundColor:'white',
    zIndex: 2,
    width:'100%',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    flex:1,
    alignItems:'center'
  },
  
  topDashIcon:{
    paddingTop:0, 
    marginTop:0, 
    position:'absolute', 
    top:-20
  },
  
  mainBoldTextTop:{
    marginTop:40, 
    fontSize:19, 
    fontWeight:'bold'
  },
  mainNormalText:{
    marginTop:9, 
    fontSize:17, 
    color:'gray'
  },
  
  textMainDiv:{
    // backgroundColor:'pink', 
    height:60, 
    marginTop:40, 
    width:'100%',
    flex:1,
    alignItems: 'center',
    
  
  },
  
  textView:{
    width:49, 
    height:49, 
    backgroundColor:'#dddddd', 
    marginTop:5, 
    borderRadius:10, 
    paddingLeft:8, 
    paddingTop:3,
    marginLeft:6,
    marginRight:6,
  },
  
  textInputs:{
    fontSize: 28, 
    paddingLeft:5 
  },
  
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:-1
  },

  scanText:{
    position:'absolute',
    top:130,
    height:200,
    width:200,
    borderWidth:2,
    borderColor:'white',
    borderRadius:10

  }


  });




  
const modalStyles = StyleSheet.create({
  saveButtonText:{fontSize:20, color:'black', backgroundColor:'#00adb0', paddingVertical:10, borderRadius:10, color:'white', marginHorizontal:5, marginTop:20, marginBottom:10},
  
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
  