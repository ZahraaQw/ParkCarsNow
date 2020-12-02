import React, { useState } from 'react';
import{NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import HomeStackScreen from './mainScreen';
import ExitQr from './ExitCode';
import EnterQr from './EnterCode';
import Find from './Find';
import SignOut from './SignOut';
import Create from './CreateEdit';
import CreatePark from './CreatePark';
import PayPalAccount  from './PayPalAccount';
import CreateAccount from './CreateAccount';
import  ContactInfopay from './ContactInfopay';
import FindPosition from './Find';
import FindMyPosition from './FindMyPosition';
import ParkingHistory from './ParkingHistory';
import Check from './Check';
import Pay from './Pay';

import PaymentScreen from './PaymentScreen';
import {Alert} from "react-native";

const Drawer = createDrawerNavigator();
let Email="";

let Id;
let name;


const App2 =(props)=>{
     const[image,setImage]=useState();
     Email= props.email;

    return(

        <Drawer.Navigator drawerContent={props=><DrawerContent {...props}   recivedEmail={Email} recivedimage={image}/>}

           drawerContentOptions={
               {
                activeBackgroundColor:"black"
               }
           }
        
        drawerStyle={
            {
             backgroundColor:"#ebf6fa",
         
            }
          
        }
        
        
        >
           {UserRegistrationFunction()}
      
     
        
    
           <Drawer.Screen  name="HomeStackScreen" component={HomeStackScreen}  />
           <Drawer.Screen name="Exit" component={ExitQr}  />
           <Drawer.Screen name="Enter" component={EnterQr } />
           <Drawer.Screen name="Find" component={Find } />
           <Drawer.Screen name="SingOut" component={SignOut} />
           <Drawer.Screen name="history" component={ParkingHistory} />
           <Drawer.Screen name="Park" component={CreatePark} />
           <Drawer.Screen name="EditProfile" component={Create} />
           <Drawer.Screen name="PayAccount" component={PayPalAccount} navigation="PayAccount"  />
           <Drawer.Screen name="CreateAccount" component={CreateAccount} navigation= "CreateAccount"/>
           <Drawer.Screen name="Contact Info" component={ContactInfopay} navigation= "Contact Info"/>
           <Drawer.Screen name="pay" component={Pay} navigation= "pay"/>
           <Drawer.Screen name="check" component={Check} navigation= "check"/>

          
        </Drawer.Navigator>

    )
}
UserRegistrationFunction = () =>{
 
  fetch('http://192.168.1.157/php_parkProj/MyInfo.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    
      email: Email,
  
    
  
    })
  
  }).then((response) => response.json())
        .then((responseJson) => {

        }).catch((error) => {
          console.error(error);
        });
 
}



export default App2