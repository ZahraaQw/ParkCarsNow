
import React, { Component } from 'react';

import {

  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert

} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

class Exiting extends Component{
    constructor(props) {
        super(props);
        this.state = { 
         qr:"",
          id:" ",
          streetName:" ",
          bookedQr:" ",
          bookId:" ",
         };
         {this.CurrentBooking()}
    
        }
    
    CurrentBooking=()=>{
      fetch('http://192.168.1.157/php_parkProj/readCurrentBook.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
        })
      
      }).then((response) => response.json())
            .then((responseJson) => {
            this.state.bookId=responseJson['bookingId']
           this.setState({ id:responseJson['name']})
            this.setState({ streetName:responseJson['Street']})
            this.setState({ bookedQr:responseJson['SlotQr']})
         
            }).catch((error) => {
              console.error(error);
            });
     
    }

    DeleteBooking=()=>{
        fetch('http://192.168.1.157/php_parkProj/FreeSlots.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             BookVal:this.state.bookId

          })
        
        }).then((response) => response.json())
              .then((responseJson) => {
             if(responseJson == "Deleted Sucess"){
                Alert.alert(
                    'Message',
                    'Thank you for use ParkNow',
                    
                    [
                   
                      { text: 'OK', onPress: () =>{ 
                       this.props.openHome()
 

                        } }
                    ],
                    { cancelable: false }
                  )
             }

              }).catch((error) => {
                console.error(error);
              });
       
      }
        onSuccess = e => {
             this.setState({qr:e.data});
          };
    
        
          render() {
            {console.log(this.state.bookId)}
            return (
              <QRCodeScanner
              cameraStyle={{
                 // paddingTop:120,
                  marginTop:70,
                  marginBottom:200,
                  paddingBottom:50,
                  marginLeft:50,
                  marginRight:30,
                  width:260,
              }}
              containerStyle={{
                  marginBottom:20,
                  height:50
              }}
    
                onRead={this.onSuccess}
                flashMode={RNCamera.Constants.FlashMode.off}
                reactivate={true}
                reactivateTimeout={5000}
    
                topContent={
                    <View  style={ styles.container }>
                    <View style={{flexDirection:'row'}}>
                    <View  style={styles.top_bttn}>
                      {this.state.streetName==" "?
                          <Text style={styles.txt1Stl}>Street Name</Text>
                          :
                      <Text style={styles.txt1Stl}>{this.state.streetName}</Text>
    
                      }
    
                    {this.state.id==" "?
                       <Text style={styles.txt2Stl}>Id</Text>
                       :
                          <Text style={styles.txt2Stl}>{this.state.id}</Text>
    
                      }            
                    </View>
          
                     <TouchableOpacity style={styles.btn_stl}>
                         <Text style={{color:"white",fontSize:14}}>Cancle this Booking</Text>
                     </TouchableOpacity>
                     </View>
          
                     <Text style={styles.txt3Stl}>Scan the code when enter the gate </Text>
                     </View>
                }
                bottomContent={
                    
                  <TouchableOpacity style={styles.buttonTouchable}>
                    {((this.state.qr==this.state.bookedQr) && (this.state.bookId != " "))?
                
                    this.DeleteBooking()
                    :
                    <Text style={styles.buttonText}>Invalid Slot</Text>
                  }
                  
                  </TouchableOpacity>
                }
              />
            );
          }
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
             
        },
        top_bttn:{
            backgroundColor:"#00457C",
             marginTop:10,
            // marginLeft:5,
             marginRight:5,
             marginBottom:10,
             height:108,
             width:180,
         },
    
         txt1Stl:{
             paddingLeft:35,
             paddingTop:20,
             fontSize:16,
    
            color:"#c1d5e8",
    
         },
         txt2Stl:{
          color:"#c1d5e8",
          fontSize:24,
          paddingLeft:70,
          paddingTop:10   
         },
    
         btn_stl:{
            backgroundColor:"#8cb9de",
            marginTop:40,
            height:50,
            justifyContent:'center',
            padding:10
            
         },
         txt3Stl:{
             color:"#677d91",
             marginLeft:40,
             marginBottom:20,
             fontSize:15,
         },
         QrView:{
           //  marginLeft:85,
             marginTop:60,
             marginBottom:80
         },
         centerText: {
            flex: 1,
            fontSize: 18,
            padding: 32,
            color: '#777'
          },
          textBold: {
            fontWeight: '500',
            color: '#000'
          },
          buttonText: {
            fontSize: 21,
            color: 'rgb(0,122,255)'
          },
          buttonTextV: {
            fontSize: 21,
            color: 'green'
          },
          buttonTouchable: {
            padding: 16
          }
    
});
export  default Exiting;