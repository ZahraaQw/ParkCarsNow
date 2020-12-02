import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditProfileScreen from './EditProfileScreen';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const EditStack = createStackNavigator();
const Create =({navigation, route })=>{

 const goBack=()=>{
  
    navigation.goBack();
    route.params.onSelect();

  }
    return(
      
        <EditStack.Navigator
        screenOptions ={{
          headerStyle:{
            backgroundColor:"#00457C",   
            height:55,
          },
          
          headerTitleAlign: 'center',
          headerShown: true,
          headerTintColor:"#99d4e9",
          headerTitleStyle:{
          },
         
  
       }}
     
        
        >
          <EditStack.Screen name="Edit Profile" component={EditProfileScreen}   options={{
        headerLeft: () => (
          <View style={{marginLeft: 20}}>
            <Icon.Button
              name="chevron-left"
              size={25}
              color='#99d4e9'
              backgroundColor="#00457C"
              onPress={()=>{goBack()}}
            />
          </View>
        ),}}/>
        </EditStack.Navigator>
      );
}

export default Create;