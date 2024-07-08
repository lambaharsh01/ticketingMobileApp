import { Ionicons } from '@expo/vector-icons';
import {View, ScrollView, StatusBar, Text, StyleSheet, BackHandler, Pressable, Modal, Alert, Switch, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

export default function App(){

const navigation=useNavigation()

const [tickets, setTickets]=useState([])
useEffect(()=>{
    initialise();
},[]);

async function initialise(){
    let ticketHistory=await getArray('ticketHistory');
    if(ticketHistory)
        setTickets(ticketHistory.reverse());
}

async function getArray(key){
try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}catch (error) {
    alert('Something Went Wrong');
}
};


function formatDate(dateString){
    let date=new Date(dateString);
if(date!==undefined && date!=='undefined'){
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
  
  
return(
<View style={{ flex:1, backgroundColor:'white'}}>
<StatusBar backgroundColor='#00adb0'/>

<ScrollView>
<View style={{flexDirection:'row', paddingVertical:10, paddingStart:15}}>
  <Pressable onPress={()=>{navigation.navigate('Home')}}>
<Ionicons name="close" size={26} style={{paddingTop:2}}/>
  </Pressable>
<Text style={{paddingLeft:5, fontSize:17}}>All Tickets</Text>
</View>

{tickets.map(element=>(
<View style={cardStyle.mainDiv}>
    <Pressable onPress={()=>{
        // console.log(element.currentDate, 'lololo');
        navigation.navigate("Ticket", element)
        }}>
        <View style={cardStyle.boxShadow}>
        <View style={[cardStyle.headerColor, {backgroundColor:element.backgroundColor}]}/>

        <View style={[cardStyle.divMarginPadding, cardStyle.boxShadow]}>


        <View style={cardStyle.flexRow}>

        <View style={cardStyle.topContent}>

        <View style={[ cardStyle.busIconDiv ,{backgroundColor:element.backgroundColor}]}>
            <Ionicons size={20} name="bus" style={{color:'white'}}/>
        </View>
            <View style={cardStyle.busInfo}>
                <Text style={[cardStyle.routeNum, { fontWeight:500}]}>{element.busRoute}</Text>
                <Text style={cardStyle.busNum}>{element.busNumber}</Text>
            </View>
        </View>

        <View style={cardStyle.ticketStatusDIv}>
            <View style={[cardStyle.ticketStatusBackground, {backgroundColor:element.backgroundColor}]}>
            <Text style={cardStyle.ticketStatusFont}>success</Text>
            </View>
        </View>
        </View>

        <View style={cardStyle.destination}>
        <Text>{element.startingStop} </Text>
        <Ionicons name="arrow-forward" size={22}/>
        <Text>{element.endingBusStop}</Text>
        </View>

        <View style={cardStyle.timingInfo}>
            <Text style={{color:'gray'}}>{formatDate(element.currentDate|| new Date())}</Text>
            <Text style={[cardStyle.ticketCosting, {fontWeight:700}]}>{element.ticketPrice} x {element.ticketCount}= {element.discountedPrice}</Text>
        </View>


        </View>


        </View>
    </Pressable>
</View>
))}

</ScrollView>
</View>
)
}



const styles=StyleSheet.create({

outerDiv:{
    width:'25%',
    aspectRatio:1/1,
    padding:15
},
innerDiv:{
    backgroundColor:'#E0FFFF', 
    width:'100%', 
    height:'100%',  
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
}

})


const cardStyle=StyleSheet.create({

    ticketCosting:{ fontSize:17},
    timingInfo:{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:10},
    destination:{flexDirection:'row', backgroundColor:'white', paddingBottom:10, borderBottomWidth:0.5, borderBottomColor:'gray'},
    ticketStatusFont:{textAlign:'center', color:'white', marginBottom:2},
    ticketStatusBackground:{ width:80, height:30, padding:3, borderRadius:20},
ticketStatusDIv:{width:'50%', backgroundColor:'white',  flexDirection:'row', alignItems:'center', justifyContent:'flex-end', paddingRight:10},
    routeNum:{fontSize:14},
    busNum:{fontSize:12, color:'#A9A9A9'},
 busInfo:{paddingTop:3, paddingLeft:5},
    busIconDiv:{width:42,height:42, margin:5, borderRadius:50, flexDirection:'row', justifyContent:'center', alignItems:'center'},
    topContent:{width:'50%', backgroundColor:'white', padding:5, flexDirection:'row'},
    flexRow:{flexDirection:'row'},
    divMarginPadding:{width:'100%', height:145, backgroundColor:'white',borderBottomRightRadius:10, borderBottomLeftRadius:10, paddingHorizontal:10},
    mainDiv:{paddingHorizontal:15, marginBottom:20},
    headerColor:{height:10, borderTopRightRadius:10, borderTopLeftRadius:10},
    boxShadow: {
      ...Platform.select({
        ios: {
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3,
        },
        android: {
          elevation: 3,
        },
      })
    },
})
  