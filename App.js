import "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './Home';
import Scanner from './scaningInfo';
import Ticket from './ticket';
import TicketHistory from './ticketHistory';

import BusButtonColor from './addDataScreens/addBusColor';
import BusInititals from './addDataScreens/addBusInitials';
import BusRoutes from './addDataScreens/addBusRoutes';
import BusStopInfo from './addDataScreens/addBusStopInfo';
import TicketStyling from './addDataScreens/addStyling';

import SendOtp from './auth/sendOtp'

const Stack=createNativeStackNavigator();

export default function Navigation(){

  const headerShown={headerShown: false}

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SendOtp">
<Stack.Screen name="SendOtp" component={SendOtp} options={headerShown}/>


<Stack.Screen name="Home" component={Home} options={headerShown}/>
<Stack.Screen name="Scanner" component={Scanner} options={headerShown}/>
<Stack.Screen name="Ticket" component={Ticket} options={headerShown}/>
<Stack.Screen name="TicketHistory" component={TicketHistory} options={headerShown}/>

<Stack.Screen name="BusRoutes" component={BusRoutes} options={headerShown}/>
<Stack.Screen name="BusInititals" component={BusInititals} options={headerShown}/>
<Stack.Screen name="BusButtonColor" component={BusButtonColor} options={headerShown}/>
<Stack.Screen name="BusStopInfo" component={BusStopInfo} options={headerShown}/>
<Stack.Screen name="TicketStyling" component={TicketStyling} options={headerShown}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}