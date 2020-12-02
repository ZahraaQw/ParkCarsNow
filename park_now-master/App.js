import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator } from '@react-navigation/drawer';
import App2 from './screens/App2';
import WelcomeScreen from './screens/WelcomeScreen';
import Signup from './screens/Signup';
import SignInScreen from './screens/SignInScreen';
import ForgetPass from './screens/ForgetPassword';
import Reset from './screens/Reset';
import FindMyPosition from './screens/FindMyPosition';
import { Alert } from 'react-native';
const Stack = createStackNavigator();
//const pass="hello in app";


class App extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      isThereUser: false,
     userEmail:"",

     };
}
OpenHomePage=()=>{
  this.setState({isThereUser : true});
}

setUserEmail=(childData)=>{
  this.setState({userEmail: childData});
 // console.log(this.state.userEmail);
}

  render(){   
  return(
    <NavigationContainer >
    {!this.state.isThereUser?(
    <Stack.Navigator>
    <Stack.Screen name="Welcom" 
     options={{
     
    
      headerTintColor:"#04243d",
      headerTitleStyle:{
          fontSize:16,
          color:"#04243d",
          
      },
      headerLeftContainerStyle:{
       paddingLeft:12,
    
       
      },
      headerStyle: {
        height: 50,
        backgroundColor:"#00457C",
        opacity:0.67
      }
    }}
    component={WelcomeScreen} /> 
    <Stack.Screen name="Sing Up" 
     options={{
     
    
      headerTintColor:"#04243d",
      headerTitleStyle:{
          fontSize:16,
          color:"#04243d",
          
      },
      headerLeftContainerStyle:{
       paddingLeft:12,
    
       
      },
      headerStyle: {
        height: 50,
        backgroundColor:"#00457C",
        opacity:0.67
      }
    }}
    >

   {(props) => <Signup  {...props}    openHome={this.OpenHomePage}  sendEmail={this.setUserEmail}/>}   

    </Stack.Screen>
    <Stack.Screen name="Sing In"
  //  props={ navigation="Sign Up"}

     options={{
     
    
      headerTintColor:"#04243d",
      headerTitleStyle:{
          fontSize:16,
          color:"#04243d",
          
      },
      headerLeftContainerStyle:{
       paddingLeft:12,
    
       
      },
      headerStyle: {
        height: 50,
        backgroundColor:"#00457C",
        opacity:0.67
        // navigation={["Sign Up","Forget Password"]}
        // openHome={[this.OpenHomePage,this.openSignUp]}
      }
    }}
    
    >

        {(props) => <SignInScreen  {...props}    openHome={this.OpenHomePage}  sendEmail={this.setUserEmail}/>}   
      </Stack.Screen>
    <Stack.Screen name="Forget Password"
     options={{
     
    
      headerTintColor:"#04243d",
      headerTitleStyle:{
          fontSize:16,
          color:"#04243d",
          
      },
      headerLeftContainerStyle:{
       paddingLeft:12,
    
       
      },
      headerStyle: {
        height: 50,
        backgroundColor:"#00457C",
        opacity:0.67
      }
    }}
    component={ForgetPass }  /> 
    <Stack.Screen name="Reset" 
     options={{
     
    
      headerTintColor:"#04243d",
      headerTitleStyle:{
          fontSize:16,
          color:"#04243d",
          
      },
      headerLeftContainerStyle:{
       paddingLeft:12,
    
       
      },
      headerStyle: {
        height: 50,
        backgroundColor:"#00457C",
        opacity:0.67
      }
    }}
    component={Reset} /> 
    </Stack.Navigator>)
      :
    <App2 name="HomeStackScreen" email={this.state.userEmail}/>
   }
  </NavigationContainer>
  );}
}

export default App;
