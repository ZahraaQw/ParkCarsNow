import React from 'react';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {Text,ImageBackground,View,StyleSheet,Dimensions, TouchableOpacity ,Button,Image} from 'react-native';


const WelcomeScreen=({navigation})=>{
  return(
    <View style={ styles.container } >
    <View style={ styles.header } >        
        <Animatable.Image
          animation="fadeIn"
      
              source={require("../assets/logo3.png")}
              resizeMode="stretch" 
              style={ styles.logo } 
          
          />

        </View>      
         
        
        <Animatable.View 
             animation="bounceInUp"
             duration={4000}
           
            style={ styles.footer } >
            <Text style={ styles.title }>Find near parking Park Now !</Text>
            <Text style={ styles.text }>Sign in with account</Text>   
            <View style={ styles.button }>
                <TouchableOpacity  onPress={()=> navigation.navigate("Sing In")}>
                    <LinearGradient
                    colors={["#00457C","#9acdf5"]}
                    style={ styles.signIn }
                    >
                 <Text   style={ styles.textSign } >Get Started </Text>
                 <Icon name="arrow-right" size={20} color="#fff" />
                   </LinearGradient>
                </TouchableOpacity>
            </View >
            </Animatable.View>            
        </View>  
     
      
    
                      
   
  );


  }
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#00457C",
    },
    imgBackground: {
       width:  windowWidth,
       height:windowHeight,
   
    },
    header:{
        flex:2,
        justifyContent:"center",
        alignItems:"center",
    },
    footer:{
        flex:1,
        backgroundColor:"#fff",
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        paddingVertical:50,
        paddingHorizontal:30
    },
    title:{
        color:"#00457C",
        fontSize:22,
        fontWeight:"bold",
    },
    text:{
        color:"#84b8e0",
        marginTop:20,
    },
    button:{
        alignItems:"flex-end",
        marginTop:16,
    },
    signIn:{
        width:180,
        height:55,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50,
        flexDirection:"row",
     
    },
    textSign:{
        color:"#fff",
        fontWeight:"bold",
        fontSize:17,
    },
    logo:{
        width:  windowWidth*0.5,
        height:windowHeight*0.26,

    }


});

export  default WelcomeScreen;