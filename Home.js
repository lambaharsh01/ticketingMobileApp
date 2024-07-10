import { Ionicons } from '@expo/vector-icons';
import {View, ScrollView, StatusBar, Text, StyleSheet, Pressable, ActivityIndicator, Image, Platform, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

export default function App(){

const navigation=useNavigation()

const headerImg=require('./initials/topSection.png');
const buliten=require('./initials/bulitenSection.png');

const [lastTickets, setLastTicket]=useState([]);
useEffect(()=>{
    initialise()
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  function backAction(){
      Alert.alert("Are you sure?", "Are you sure you want to exit the app", [
        {text: "CANCEL", onPress: () => null, style: "cancel"},
        { text: "EXIT", onPress: () => {
          BackHandler.exitApp();
        }}
      ]);
    return true; 
  };


async function initialise(){
    let ticketHistory=await getArray('ticketHistory');
    if(ticketHistory){
        setLastTicket([ticketHistory[ticketHistory.length-1]]);
    }
}

async function getArray(key){
try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}catch (error) {
    Alert.alert('Something Went Wrong');
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
  
  



const [showLoading, setShowLoading]=useState(false);
  

let scrollPosition = useState(0);

const handleScroll = async(event) => {
    const currentPosition = event.nativeEvent.contentOffset.y;
    if (currentPosition === 0 && scrollPosition > 0) {
        scrollPosition=currentPosition;
        
        setShowLoading(true);

        let ticketHistory=await getArray('ticketHistory');
        if(ticketHistory){
            setLastTicket([ticketHistory[ticketHistory.length-1]]);
        }
        setTimeout(()=>{
            setShowLoading(false);
        },1500)


    } else {
        scrollPosition=currentPosition;
    }
  };

return(
<View style={{ flex:1, backgroundColor:'white'}}>
<StatusBar backgroundColor='#00adb0'/>

<ActivityIndicator size='large' color='#00adb0' animating={showLoading} style={{ height:showLoading?40: 0,}}/>

<ScrollView 
 onScroll={handleScroll}>


<View style={{width:'100%'}}>
<Image source={headerImg} style={{height:260, width:'100%'}}/>
</View>

<View style={{flexDirection:'row', marginTop:10}}>
    <View style={styles.outerDiv}>
        <Pressable onPress={()=>{navigation.navigate("Scanner")}}>
        <View style={styles.innerDiv}>
            <Ionicons size={40} name="ticket"/>
        </View>
        </Pressable>
        <Text style={{textAlign:'center'}}>Bus Ticket</Text>
    </View>
    <View style={styles.outerDiv}>
        
    <Pressable onPress={()=>{navigation.navigate("BusRoutes")}}>
        <View style={styles.innerDiv}>
            <Ionicons size={40} name="git-pull-request-sharp"/>
        </View>
    </Pressable>

        <Text style={{textAlign:'center'}}>Route Info</Text>
    </View>
    <View style={styles.outerDiv}>

    <Pressable onPress={()=>{navigation.navigate("BusInititals")}}>
        <View style={styles.innerDiv}>
            <Ionicons size={40} name="bus"/>
        </View>
    </Pressable>

        <Text style={{textAlign:'center'}}>Bus Inititals</Text>
    </View>
    <View style={styles.outerDiv}>

    <Pressable onPress={()=>{navigation.navigate("BusButtonColor")}}>
        <View style={styles.innerDiv}>
            <Ionicons size={40} name="color-fill"/>
        </View>
    </Pressable>
        <Text style={{textAlign:'center'}}>Color</Text>
    </View>
</View>

<View style={{flexDirection:'row', marginTop:28, marginBottom:30}}>
    <View style={styles.outerDiv}>

    <Pressable onPress={()=>{navigation.navigate("BusStopInfo")}}>
        <View style={styles.innerDiv}>
            <Ionicons size={40} name="grid"/>
        </View>
    </Pressable>
        <Text style={{textAlign:'center'}}>Bus Stops</Text>
    </View>

    <View style={styles.outerDiv}>
    <Pressable onPress={()=>{navigation.navigate("TicketStyling")}}>
        <View style={styles.innerDiv}>
            <Ionicons size={40} name="albums"/>
        </View>
    </Pressable>
        <Text style={{textAlign:'center'}}>Ticket Styling</Text>
    </View>

    <View style={styles.outerDiv}>
    <Pressable onPress={()=>{navigation.navigate("UploadTickets")}}>
        <View style={styles.innerDiv}>
            <Ionicons size={40} name="cloud-upload"/>
        </View>
    </Pressable>
        <Text style={{textAlign:'center'}}>Upload Tickets</Text>
    </View>

    <View style={styles.outerDiv}>
    <Pressable onPress={()=>{navigation.navigate("AdminAuth")}}>
        <View style={styles.innerDiv}>
            <Ionicons size={40} name="refresh-circle"/>
        </View>
    </Pressable>
        <Text style={{textAlign:'center'}}>Admin Auth</Text>
    </View>
</View>

<Image source={buliten} style={{width:'100%', height:130, marginTop:18}}/>





<View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:17, marginTop:10, marginBottom:20}}>

<Text style={{fontSize:17, fontWeight:'bold'}}>Tickets</Text>
<Pressable onPress={()=>{navigation.navigate('TicketHistory')}}>
<Text style={{marginTop:3}}>View all tickets</Text>
</Pressable>
</View>

{lastTickets.map((element, index)=>(
<View key={'tickets'+index} style={cardStyle.mainDiv}>
    <Pressable onPress={()=>{
        navigation.navigate("Ticket", element)}}>
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
            <Text style={{color:'gray'}}>{formatDate(element.currentDate || formatDate(new Date()))}</Text>
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
    mainDiv:{paddingHorizontal:15, marginBottom:50},
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

