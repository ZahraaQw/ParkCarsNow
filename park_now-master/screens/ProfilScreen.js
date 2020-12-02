import React, { useState,useEffect } from 'react';
import {View, SafeAreaView, StyleSheet,ScrollView,Button, Alert} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


const ProfilScreen=(props)=>{
    
 // const[id,setId]=useState("");
 //let Selected=false;

  const[name,setName]=useState("");
  const[Email,setEmail]=useState("");
  const[city,setCity]=useState("");
  const[phone,setPhone]=useState("");
  const[palatte,setPalatte]=useState("");
  const[Image,setImage]=useState();
  const[payEmail,setPayEmail]=useState("");
  const[Points,setPoints]=useState();

  const GetInfo = () =>{
 
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
         
           // setId(responseJson['id']);
           setImage(responseJson['image']);
            setName(responseJson['name']);
            setEmail(responseJson['email']);
            setCity(responseJson['city']);
            setPhone(responseJson['phone']);
            setPalatte(responseJson['palette']);
     
           
          }).catch((error) => {
            console.error(error);
          });

          
   
  }

  const GetInfo2 = () =>{
 
    fetch('http://192.168.1.157/php_parkProj/getMailPoint.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            email:Email 
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
        
            setPayEmail(responseJson['PayMail']);
            setPoints(responseJson['Points']);
           // console.log(Email,payEmail,Points);
          //  console.log(responseJson);
     
           
          }).catch((error) => {
            console.error(error);
          });

          
   
  }



     const Refrech =()=>{
 
      GetInfo();

  
     }

  
    return (

       
        <ScrollView style={styles.container}>

            { 
        
            GetInfo(),
            GetInfo2(),
             props.SelectedDone() ? Refrech():null
         
            }

          
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Avatar.Image 
                source={{
               uri:Image !=""?Image:'https://developers.google.com/web/images/contributors/no-photo.jpg',
                }}
                size={80}
              />
              <View style={{marginLeft: 20}}>
                <Title style={[styles.title, {
                  marginTop:30,
                  marginBottom:0,
                }]}>{Email.split("@")[0].trim() || ''}</Title>
                <Caption style={styles.caption}>@gmail.com</Caption>
              </View>
            </View>
          </View>

          <View>
    
          </View>
    
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
            <FontAwesome name="globe"  color="#65808a" size={20} />
              <Text style={styles.txt}>{city}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#65808a" size={20}/>
              <Text style={styles.txt}>{phone}</Text>
            </View>
            <View style={styles.row}>
            <FontAwesome name="envelope-o"  color="#65808a"  size={20} />
              <Text style={styles.txt}>{Email}</Text>
            </View>
            <View style={styles.row}>
            <FontAwesome name="car"  color="#65808a" size={20} />
              <Text style={styles.txt}>{palatte}</Text>
            </View>
          </View>
    
         
          <View style={styles.menuWrapper}>
            <TouchableRipple onPress={() => {}}>
              <View style={styles.menuItem}>
                <Icon name="credit-card" color="#00457C" size={25}/>
                <Text style={styles.menuItemText}>Payment Info </Text>
                
              </View>
              
            </TouchableRipple>
            <View style={styles.menuItem}>
            <FontAwesome name="envelope-o"  color="#65808a"  size={20} />
              <Text style={styles.txt}>{payEmail}</Text>
            </View>

            <View style={styles.menuItem}>
            <FontAwesome name="database"  color="#65808a"  size={20} />
              <Text style={styles.txt}>{Points}   Points</Text>
            </View>
            
          </View>
        </ScrollView>
      );
    };

  
   

    export default ProfilScreen;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor:"#ebf7fc"
      },
      userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 15,
      },
      title: {
        fontSize: 19,
        fontWeight: 'bold',
        color:"#08374a"
      },
      caption: {
        fontSize: 16,
        color:"#65808a"
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
      },
      infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      menuWrapper: {
        marginTop: 10,
      },
      menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
      },
      menuItemText: {
        color:"#08374a",

        marginLeft: 20,
         fontWeight:'bold',
        fontSize: 16,
        lineHeight: 26,
      },

      bttn:{
        backgroundColor:"#c49fc4"
      },
      txt:{
        color:"#65808a",
        marginLeft: 25,
        paddingBottom:3,
        


      }

    });
    