import React, { useState,useEffect} from 'react';
import {StyleSheet,Button,TextInput,View,Text,TouchableOpacity,ScrollView,Modal, Alert} from 'react-native';
import {Formik} from 'formik';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
//import { IconButton, Colors } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

const ReviewForm=(props)=>{

    let price= props.Price;
    let id = props.id;
    let childId = props.ChId;
    let time=props.Time;
    let dt= props.Dat;
    let duration= props.duration;
    let UserEmail= props.Uemail;
   const [ModaleOpen, setModaleOpen] = useState(false);
   const [qrdata, setQRdata] = useState('');
  [isValidNumber, setisValidNumber]= useState(true);
  [isValidPass, setisValidPass]= useState(true);
  [isQrdisadled, setisQrdisadled]= useState(true);
  const[PayPalEmail,setPayPalEmail]= useState();
  const[Carpalette,setCarpalette]=useState();
  const[Password,setPassword]=useState();
  const[isGoodPass,setisGoodPass]=useState(false);
  const[isGoodNum,setisGoodNum]=useState(false);
 
  
  gtSlotQR = () =>{
 
    fetch('http://192.168.1.157/php_parkProj/ReturnQr.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       
         id:id,
         childId:childId,
  
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
            setQRdata(responseJson);
          }).catch((error) => {
            console.error(error);
          });
   
  }

  ReserveSlot = () =>{
 
    fetch('http://192.168.1.157/php_parkProj/SlotReservation.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         Email:UserEmail,
         Price:price,
         id:id,
         childId:childId,
         Stime:time,
         Sdate:formatDate(dt),
         duration:duration,
       //  EnterQr:qrdata,
        // ExitQr:(qrdata+"exitcode"),
         CarNum:Carpalette,
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
           
        if(responseJson== 'Points updated'){
            setModaleOpen(true);
        }
        else{
          console.log(responseJson);
        }
          }).catch((error) => {
            console.error(error);
          });
   
  }


  const TestEmail = () =>{
 
    fetch('http://192.168.1.157/php_parkProj/SlotBooking.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
         Email:UserEmail,
         PayPalPass:Password,
         Price:price,
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            console.log(price);

           if(responseJson== "Points enugh"){
            Alert.alert(
              'Message',
              'Are you sure to complete the reservation ?',
              
              [
             
                { text: 'OK', onPress: () =>{ 
                     
                  ReserveSlot();
                 

                  } }
              ],
              { cancelable: false }
            )
           }
           if(responseJson=="Points not enugh"){
            Alert.alert(
                'Message',
                'your points not enugh,go to PayPal and buy',
                
                [
               
                  { text: 'OK', onPress: () =>{ 

                    props.buyPoints();

     
                    } }
                ],
                { cancelable: false }
              )
           }

           if(responseJson=="UserEmail not found"){
            Alert.alert(
                'Message',
                'You do not have PayPalAccount , create one',
                
                [
               
                  { text: 'OK', onPress: () =>{ 

                    props.goToPay();

                    } }
                ],
                { cancelable: false }
              )
           }
           else if(responseJson=="Password Not correct"){
            Alert.alert("Incorrect Password" )
           }
        
          }).catch((error) => {
            console.error(error);
          });
   
  }
  
 const validate=(text,type)=>{
    num=/[0-9]+$/;
    numP =/^[0-9a-zA-Z]+$/;
    if(type=='Number'){
    if((num.test(text)) && (text.trim().length ==7))
    {
  
        setisValidNumber(true);
        setisGoodNum(true);
       setisQrdisadled(false);
        //setQRdata(text);
 
    }
    else{

        setisValidNumber(false);
       setisGoodNum(false);
        setisQrdisadled(true);

    }
     

   }else if(type=='password'){
    if((numP.test(text)) && (text.trim().length >7))
    {
  
        setisValidPass(true);
        setisQrdisadled(false);
        setisGoodPass(true);

 
    }
    else{

        setisValidPass(false);
        setisGoodPass(false);
        setisQrdisadled(true);

    }

   }
}  
const formatDate = (date) => {
  return `${date.getDate()}-${date.getMonth() +
    1}-${date.getFullYear()}`;
};
    return(
        <ScrollView>
          {gtSlotQR()}
            <Modal  visible={ModaleOpen} animationType="fade" >
                <View>

                <View style={styles.qrContainer}>
                    <Text style={styles.txtqr}>Slot QR code</Text>
                <QRCode
                value={qrdata}
                color="#011424"
                backgroundColor='white'
                size={220}       
                />
                </View>
             

                <TouchableOpacity 
                 
                 onPress={() =>{
                  Alert.alert(
                    'Message',
                    'Use QR code to get right slot, you can track your reservation',
                    
                    [
                   
                      { text: 'OK', onPress: () =>{ 
                           props.goHome();
                           setModaleOpen(false);
                        } }
                    ],
                    { cancelable: false }
                  )
               
                
                }}
                  >
                <View style={styles.canslbuttStl}>
                    <Text style={styles.txtStl}>OK  </Text>
                    <FontAwesome
                        name="check"
                        color="#99d4e9"
                        size={20}
                    />
                    </View>
                    </TouchableOpacity>
                </View>
            
                </Modal>

        
                    <ScrollView>
            
                        <TextInput
                    
                        style={styles.inputStl}
                        placeholder='Car palette number'
                        keyboardType='numeric'
                        onChangeText={(text)=>{setCarpalette(text);validate(text,'Number')}}
                        
                        />
                                 {isValidNumber ? null : 
                      <View> 
                        <Text style={styles.ErrMsg}>Car palette number must be 7 long  . </Text>
                        </View>
                 }
                        <TextInput
                         secureTextEntry
                        style={styles.inputStl}
                        placeholder='Enter PayPal password'
                        onChangeText={(text)=>{setPassword(text);validate(text,'password')}}
                        
                        />
                          {isValidPass ? null : 
                      <View> 
                        <Text style={styles.ErrMsg}>Password must be  more than 8 long  . </Text>
                        </View>
                 }
                        <TouchableOpacity 
                        disabled={!(isGoodPass && isGoodNum) }
                        style={{ opacity: !(isGoodPass && isGoodNum)? 0.7 : 1 }}
                        onPress={()=>{TestEmail();
                        
                        }}>
                        <View style={styles.buttStl}>
                           <Text style={styles.txtStl}>Book and Gerate QR   </Text>
                           <FontAwesome
                                name="qrcode"
                                color="#5b6f80"
                                size={30}
                            />
                          </View>

                          </TouchableOpacity>

                          </ScrollView>

                    
     
        </ScrollView>
    );
}

const styles = StyleSheet.create({

inputStl:{
  borderWidth:1.4,
  borderColor:"#00457C",
  
  padding:10,
  fontSize:14,
  borderRadius:6,
  marginLeft:30,
  marginRight:30,
  marginBottom:10,
},

buttStl:{
    flexDirection:'row',
   backgroundColor:'#00457C',
   paddingVertical:20,
   marginTop:15,
   marginLeft:31,
   marginRight:31,
  // marginBottom:40,
   justifyContent:'center',
   alignItems:'center',
   //opacity:0.6
},
txtStl:{
    color:'#99d4e9',
    fontSize:18,
    fontWeight:"800"
},
canslbuttStl:{
    flexDirection:'row',
    backgroundColor:'#455f75',
    paddingVertical:15,
    marginTop:12,
    marginLeft:100,
    marginRight:100,
    borderRadius:70,
   // marginBottom:40,
    justifyContent:'center',
    alignItems:'center',
},
modalToggle:{
    //marginTop:20,
    //marginBottom:20,
    backgroundColor:'#f2f2f2',    
    padding:2,
    alignSelf:'center',

     
},
txtqr:{
  marginBottom:20,
  fontSize:20,
  color:"#00457C"
},
qrContainer:{
    borderWidth:1.4,
    borderColor:"#00457C",
    borderRadius:25,
    marginLeft:45,
    marginRight:45,
    marginTop:90,
    marginBottom:30,
    padding:20,
    paddingBottom:40,
    alignItems:'center',
   
},
ErrMsg:{
    color:"#c90c16",
    fontSize:10,
    paddingLeft:30,

}

})


export default ReviewForm;