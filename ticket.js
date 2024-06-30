import {View, ScrollView, StatusBar, TextInput, Text, StyleSheet, BackHandler, Pressable, Modal, Alert, Switch,Dimensions } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from '@expo/vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';

export default function App({route}){

  const navigation=useNavigation();

function hexToRgb(hex, opacity){
    hex = hex.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
  

  function formatDate(dateString){
    let date=new Date(dateString);
    if(date){
    const options = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata'  };
    const formattedDate = date.toLocaleString('en-US', options);
    
    const day = ('0' + date.getDate()).slice(-2);
    const month = date.toLocaleString('en-US', { month: 'short' }).slice(0, 3);
    const year = date.getFullYear().toString().slice(-2);
    const time = formattedDate.split(',')[1].trim();
    
    const timeSplit=time.split(':');
    const timeDigitsDemo=timeSplit[2];

    const twoDigHr = ('0' + timeSplit[0]).slice(-2);
    const timeDigits=twoDigHr+':'+timeSplit[1]+' '+timeDigitsDemo[timeDigitsDemo.length-2]+timeDigitsDemo[timeDigitsDemo.length-1];

    return `${day} ${month}, ${year} | ${timeDigits}`;
    }else{
      return '';
    }
  }
  

  function formatDateToDDMMYYYY(date) {
    if(date){
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}${month}${year}`;
    }else{
      return '';
    }
  }

const backgroundColor=route.params.backgroundColor;
const busNumber=route.params.busNumber;
const busRoute=route.params.busRoute;
const startingStop=route.params.startingStop;
const endingBusStop=route.params.endingBusStop;

const ticketPrice=route.params.ticketPrice;
const discount=route.params.discount;
const discountedPrice=route.params.discountedPrice;
const ticketCount=route.params.ticketCount;
const time=route.params.currentDate || route.params.time || new Date();

const currentDate=formatDate(new Date(time));
const currentDateForId =formatDateToDDMMYYYY(new Date(time));


const [showQr, setShowQr]=useState(false);


const { height, width } = Dimensions.get('window');

const [centerViewTopMargin, setCenterViewTopMargin]=useState(0);
const [centerViewSideMargin, setCenterViewSideMargin]=useState(0);
const [qrSize, setQrSize]=useState(0);


const handleLayout = (event) => {
  const viewHeight = event.nativeEvent.layout.height;
  const viewWidth = event.nativeEvent.layout.width;

  setQrSize(viewWidth);
  setCenterViewSideMargin((width-viewWidth)/2);
  setCenterViewTopMargin((height - viewHeight)/2);
};

const [fontSizeTicket, setFontSizeTicket]=useState(0);
const [fontSizeAllTickets, setFontSizeAllTickets]=useState(0);
const [fontSizeTransportDeptHeading, setFontSizeTransportDeptHeading]=useState(0);
const [fontSizeSectionHeadings, setFontSizeSectionHeadings]=useState(0);
const [fontSizeSectionContent, setFontSizeSectionContent]=useState(0);
const [fontSizeArrival, setFontSizeArrival]=useState(0);

const [verticalSpacing, setVerticalSpacing]=useState(0);


const getValue = async (key) => {
  try {
      const stringValue = await AsyncStorage.getItem(key);
      return isNaN(stringValue)? 0 : Number(stringValue);
  }catch (error) {
      alert('Something Went Wrong');
  }};
  
  useEffect(async()=>{

async function getKeyValue(key){
  let value= await getValue(key);
  if(isNaN(value))
  return 0;

  return Number(value);
}
      setFontSizeTicket(await getKeyValue('Ticket'));
      setFontSizeAllTickets(await getKeyValue('AllTickets'));
      setFontSizeTransportDeptHeading(await getKeyValue('TransportDeptHeading'));
      setFontSizeSectionHeadings(await getKeyValue('SectionHeadings'));
      setFontSizeSectionContent(await getKeyValue('SectionContent'));
      setFontSizeArrival(await getKeyValue('Arrival'));
      setVerticalSpacing(await getKeyValue('VerticalSpacing'));
  }, []);

//Style
const styles=StyleSheet.create({
  dataView:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    marginBottom:(10 + verticalSpacing)
  },
    dataViewTop:{
      flexDirection:'row', 
      justifyContent:'space-between', 
      paddingTop:(10 + verticalSpacing)
    },
  
    subFontSize:{
      fontSize:(14.5 + fontSizeSectionHeadings)
    },
  
    mainFontSize:{
      fontSize:(18 + fontSizeSectionContent)
    },
  
    subFontSizeRight:{
      fontSize:(14.5 + fontSizeSectionHeadings),
      textAlign:'right'
    },
  
    mainFontSizeRight:{
      fontSize:(18 + fontSizeSectionContent),
      textAlign:'right'
    },
    hr: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      width: '100%',
      marginVertical: (10 + verticalSpacing),
    },
    innerContainer: {
      position: 'absolute',
      transform: [{ translateY:centerViewTopMargin },{translateX:centerViewSideMargin}],
      // height:'65%',
       width:'100%',
        backgroundColor:'white', 
        borderRadius:7, 
        padding:18
    },
    marginTop8:{marginTop:8},
    ticketHeadingFontSize:{fontSize: (17 + fontSizeTicket)},
    allTicketFontSize:{fontSize:(15 + fontSizeAllTickets)},
    transportDeptHeading:{fontSize:(18.6 + fontSizeTransportDeptHeading)},
    arivalFontSize:{fontSize:(16 + fontSizeArrival)},
    });
  
  
return(
<View style={{ flex:1, backgroundColor:backgroundColor, padding:15}}>
<StatusBar backgroundColor='#00adb0'/>

<View style={{height:'18%', width:'100%', flexDirection:'row', justifyContent:'space-between', position:'relative'}}>
<View style={{flexDirection:'row', paddingTop:5}}>
  <Pressable onPress={()=>{navigation.navigate("Home")}}>
<Ionicons name="close" size={26} style={{paddingTop:2, color:'white'}}/>
  </Pressable>
<Text style={[{paddingLeft:13, color:'white'}, styles.ticketHeadingFontSize]}>Ticket</Text>
</View>
<Pressable onPress={()=>{navigation.navigate('TicketHistory')}}>
<Text style={[styles.allTicketFontSize, {paddingTop:7, color:'white', textDecorationLine: 'underline', paddingRight:10}]}>All tickets</Text>
</Pressable>
</View>



{!showQr && (

<View key="mainDiv1" style={styles.innerContainer} onLayout={handleLayout}>

<Text style={[styles.transportDeptHeading, {textAlign:'center', fontWeight:500}]}>Transport Dept. of Delhi</Text>

<View style={styles.dataViewTop}>
  <Text style={styles.mainFontSize}>{busNumber}</Text>
  <Text style={styles.mainFontSize}>{discount? discountedPrice:ticketPrice}</Text>
</View>

<View style={styles.hr}/>

<View style={styles.dataView}>
  <View>
    <Text style={styles.subFontSize}>Bus Route</Text>
    <Text style={styles.mainFontSize}>{busRoute}</Text>
  </View>
  <View>
    <Text style={[styles.subFontSizeRight]}>Fare</Text>
    <Text style={[styles.mainFontSizeRight, {fontWeight:500}]}>{ticketPrice}</Text>
  </View>
</View>

<View style={styles.dataView}>
  <View>
    <Text style={styles.subFontSize}>Booking Time</Text>
    <Text style={styles.mainFontSize}>{currentDate}</Text>
  </View>
  <View>
    <Text style={styles.subFontSizeRight}>Tickets</Text>
    <Text style={styles.mainFontSizeRight}>{ticketCount}</Text>
  </View>
</View>




<View style={styles.dataView}>
  <View>
    <Text style={styles.subFontSize}>Starting stop</Text>
    <Text style={styles.mainFontSize}>{startingStop}</Text>
  </View>
</View>


<View style={styles.dataView}>
  <View>
    <Text style={styles.subFontSize}>Ending stop</Text>
    <Text style={styles.mainFontSize}>{endingBusStop}</Text>
  </View>
</View>


<Text style={[styles.subFontSize, {textAlign:'center', marginBottom:10}]}>T{currentDateForId}e706ea82bb</Text>
<Pressable onPress={()=>{setShowQr(true)}}>
<View style={{height:50,flexDirection:'row', justifyContent:'center', alignItems:'center', borderWidth:1.5, borderColor:'#059033', borderRadius:7, backgroundColor:hexToRgb('#059033', 0.1)}}>
  <QRCode value={'0'} size={27} color={'#059033'} backgroundColor={hexToRgb('#008000', 0.0)}/><Text style={{color:'#059033', fontWeight:500, fontSize:16, marginLeft:8}}>Show QR code</Text>
</View>
</Pressable>

<Text style={[styles.marginTop8, styles.arivalFontSize]}>Arrival: </Text>
</View>
)}

{showQr && (

<View key="mainDiv2" style={{height:'47%', marginTop:50,width:'100%', backgroundColor:'white', borderRadius:7, padding:15}}>
<QRCode value={'eyJidXNfbnVtYmVyIjoiREwxUEQ2MDA1IiwiYnVzX3JvdXRlIjoiMDhTVExVUCIsImJvb2tpbmdfdGltZSI6IjIwMjMtMTEtMTgMjA6MzQ6MTgiLCJ2YWxpZGl0eSI6IjIwMjMtMTEtMTEgMDM6MDA6MDAiLCJ0aWNrZXRfaWQiOiJUMTAxMTIwMjM1MDIwM2JhNmQ2IiwiZmFyZV9wZXJfdGlja2V0IjoxMCwiYnVzX2FnZW5jeSI6IkRJTVRTIn0='} size={(qrSize-30)}/>
</View>


)}



<View style={{height:'17%', width:'100%'}}>

</View>



</View>
)
}


