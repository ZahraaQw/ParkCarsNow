import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditProfileScreen from './EditProfileScreen';
import FindMyPosition from './FindMyPosition';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const FindStack = createStackNavigator();

const FindPosition=({navigation,props,route})=>{
  const[UserEmail,setUserEmail]=useState();
 
 
  GetUserInfo = () =>{
 
    fetch('http://192.168.1.157/php_parkProj/CurrentUser.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
        
            setUserEmail(responseJson['email']);
        
          }).catch((error) => {
            console.error(error);
          });
   
  }
      
    SetCurrentBooking = () =>{
 
      fetch('http://192.168.1.157/php_parkProj/getCurrentBook.php', {
        method: 'POST',
        headers: {              
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        
          Email:UserEmail,
      
        })
      
      }).then((response) => response.json())
            .then((responseJson) => {
    
            }).catch((error) => {
              console.error(error);
            });
     
    }
    return(
      
      
        <FindStack.Navigator
        screenOptions ={{
          headerStyle:{
            backgroundColor:"#00457C",   
            height:55,
          },
          
          headerTitleAlign: 'center',
          headerShown: true,
          headerTintColor:"#ebf7fc",
          headerTitleStyle:{
          },
         
  
       }}
     
        
        >
          {
             GetUserInfo(),
             route.params.HomeSelect ? SetCurrentBooking() : console.log("h")
         
          }
          {route.params.HomeSelect?

          <FindStack.Screen name="Find My Position"  options={{
      
      headerLeftContainerStyle:{
        paddingLeft:2,
     
        
       },
      headerTintColor:"#04243d",

      headerTitleStyle:{
        fontSize:16,
        color:"#a2caeb",
        
      },
        headerLeft: () => (
          <View style={{marginLeft: 20}}>
            <Icon.Button
              name="chevron-left"
              size={25}
              color="#a2caeb"
              backgroundColor="#00457C"
              onPress={() => navigation.goBack()}
            />
          </View>
        ),}}>

        {(props) => <FindMyPosition  {...props}  Email={UserEmail} Val={route.params.HomeSelect}/>}   

          </FindStack.Screen>:null}
        </FindStack.Navigator>
      );
}

export default FindPosition;