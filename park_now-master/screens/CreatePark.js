import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ParkCar from './ParkCar';
import Slots from './Slots';
import Parking from './Parking';

const ParkStack = createStackNavigator();
const CreatePark=({navigation})=>{
    return(
      
        <ParkStack.Navigator
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
          <ParkStack.Screen name="Park Car" component={ParkCar}   options={{
        headerLeft: () => (
          <View style={{marginLeft: 20}}>
            <Icon.Button
              name="chevron-left"
              size={25}
              color='#ebf7fc'
              backgroundColor="#00457C"
              onPress={() => navigation.navigate('HomeStackScreen')
            }
            />
          </View>
        ),}}/>
         <ParkStack.Screen name="available slots" component={Slots}
          
         />
         <ParkStack.Screen name="available Parking" component={Parking} />

        </ParkStack.Navigator>
      );
}

export default CreatePark;