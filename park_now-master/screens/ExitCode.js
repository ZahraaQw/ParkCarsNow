import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import  Exiting from './ExitQrpage';

const QRStack = createStackNavigator();
const ExitQr=({navigation})=>{

  OpenHomePage=()=>{
    navigation.navigate('HomeStackScreen');

  }
    return(
      
        <QRStack.Navigator
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
          headerTitleStyle:{
            fontSize:17,
          //  color:"#04243d",
            
        },

       }}
     
        
        >
          <QRStack.Screen name="Exit scanning"  options={{
        headerLeft: () => (
          <View style={{marginLeft: 20}}>
            <Icon.Button
              name="chevron-left"
              size={25}
              color='#ebf7fc'
              backgroundColor="#00457C"
              onPress={() => navigation.goBack()}
            />
          </View>
        ),}}>
  {(props) => <Exiting {...props}    openHome={OpenHomePage} />}   

        </QRStack.Screen>
        

        </QRStack.Navigator>
      );
}

export default ExitQr;