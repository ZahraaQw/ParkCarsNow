
import React, {useState} from 'react';

import {View,Text,StyleSheet,TouchableOpacity,ScrollView,Modal, Button,Alert} from 'react-native';
import CountDown from 'react-native-countdown-component';
import { IconButton, Colors } from 'react-native-paper';
import { TouchableHighlight } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

//import ExtendDuration from './ExtendDuration';
let timeSec=0;

const SettingScreen=({navigation})=>{
    const [totalDuration, setTotalDuration] = useState(10);
    const [isFinished,setIsFinished] = useState(false);
    const [priceModalOpen, setPriceModaleOpen] = useState(false);
    const [soltPrice, setslotPrice]=useState(0);
    const[disableOk, setdisableOk] = useState(true);
    const[extendsId, setextendsId]=useState(-1);
   

    const[colorbtn0, setcolorbtn0]=useState("#445454");
    const[colorbtn1, setcolorbtn1]=useState("#445454");
    const[colorbtn2, setcolorbtn2]=useState("#445454");
    const[colorbtn3, setcolorbtn3]=useState("#445454");
    const[colorbtn4, setcolorbtn4]=useState("#445454");
    const[colorbtn5, setcolorbtn5]=useState("#445454");
 
    const[isDisabled0,setisDisabled0]=useState(false);
    const[isDisabled1,setisDisabled1]=useState(false);
    const[isDisabled2,setisDisabled2]=useState(false);
    const[isDisabled3,setisDisabled3]=useState(false);
    const[isDisabled4,setisDisabled4]=useState(false);
    const[isDisabled5,setisDisabled5]=useState(false);

     const cancleTimer=()=>{
        Alert.alert(
            'Alert Title',
            'Are you sure you want to stope booking?',
            [
           
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'OK', onPress: () =>{ 
                console.log("hello");  
                setTotalDuration(0);
                } }
            ],
            { cancelable: false }
          );
     }
    

    const bookSlot=(id,price)=>{
       
        
      setslotPrice(price); 
      setextendsId(id);
      if(id == 0){
          setcolorbtn0("green");
          setdisableOk(false);
          setisDisabled1(true);
          setisDisabled2(true);
          setisDisabled3(true);
          setisDisabled4(true);
          setisDisabled5(true);
         // timeSec=18;

        
      }
      else if(id == 1){
          setcolorbtn1("green");
          setdisableOk(false);
          setisDisabled0(true);
          setisDisabled2(true);
          setisDisabled3(true);
          setisDisabled4(true);
          setisDisabled5(true);
          //timeSec=36;


      }

      else if(id == 2){
          setdisableOk(false);
          setcolorbtn2("green");
          setisDisabled0(true);
          setisDisabled1(true);
          setisDisabled3(true);
          setisDisabled4(true);
          setisDisabled5(true);
         // timeSec=54;


          }

      else if(id == 3){
          setcolorbtn3("green");
          setdisableOk(false);
          setisDisabled0(true);
          setisDisabled1(true);
          setisDisabled2(true);
          setisDisabled4(true);
          setisDisabled5(true);
         // timeSec=72;

      }

      else if(id == 4){
          setcolorbtn4("green");
          setdisableOk(false);
          setisDisabled0(true);
          setisDisabled1(true);
          setisDisabled2(true);
          setisDisabled3(true);
          setisDisabled5(true);
         // timeSec=90;

      }

      else if(id == 5){
          setcolorbtn5("green");
          setdisableOk(false);
          setisDisabled0(true);
          setisDisabled1(true);
          setisDisabled2(true);
          setisDisabled3(true);
          setisDisabled4(true);
        //  timeSec=108;

      }
  }

  const CancleBook=()=>{
    setTotalDuration(0)
    setcolorbtn0("#445454");
    setcolorbtn1("#445454");
    setcolorbtn2("#445454");
    setcolorbtn3("#445454");
    setcolorbtn4("#445454");
    setcolorbtn5("#445454");
  
    setdisableOk(true);
   setisDisabled0(false);     
    setisDisabled1(false);
    setisDisabled2(false);
    setisDisabled3(false);
    setisDisabled4(false);
    setisDisabled5(false);
   }
   const confirmBook=()=>{
    Alert.alert(
        'Alert Title',
        'Confirm  choosed booking duration ',
        [
       
          {
            text: 'Cancel',
            style: 'cancel'
          },
          { text: 'OK', onPress: () =>{ 
           setPriceModaleOpen(false);
          // console.log(timeSec);
          // setTotalDuration(timeSec);
      
            } }
        ],
        { cancelable: false }
      );
  }
    return(

    <View  style={ styles.container }>

<Modal  visible={priceModalOpen} animationType="slide">
             <ScrollView style={styles.ModalContent}>
             <IconButton 
               style={styles.modalToggle}
               icon="close"
               color="#00457C"
               size={20}
               onPress={() =>setPriceModaleOpen(false)}
           />
           <View>
               <Text style={{margin:10,marginLeft:80,fontSize:16,color:"#0b2f4d"}}>Choose booking duration</Text>
               <TouchableHighlight style={styles.priceContainer}>
                  <ScrollView>
                      <View style={{flexDirection:"row"}}>
                          <Text style={styles.PriceTxt}>15  minutes</Text>
                          <FontAwesome
                          style={{
                              paddingTop:20
                          }}
                            name="long-arrow-right"
                            color="#445454"
                            size={26}
                        />
                         <Text style={styles.PriceTxt}>{10} Ponits</Text>
                         <IconButton 
                          color={colorbtn0}  
                          icon="checkbox-multiple-marked-circle"
                          size={35}
                          disabled={isDisabled0}
                        
                          onPress={()=>{bookSlot(0,10);setTotalDuration(900)}}

                        />

                      </View>

                      <View style={{flexDirection:"row"}}>
                          <Text style={styles.PriceTxt}>30  minutes</Text>
                          <FontAwesome
                          style={{
                              paddingTop:20
                          }}
                            name="long-arrow-right"
                            color="#445454"
                            size={26}
                        />

                        
                         <Text style={styles.PriceTxt}>{20} Ponits</Text>

                         <IconButton 
                          color={colorbtn1}  
                          icon="checkbox-multiple-marked-circle"
                          disabled={isDisabled1}
                          size={35}
                          onPress={()=>{bookSlot(1,20);setTotalDuration(1800)}}

                        />
                    
                      </View>

                      <View style={{flexDirection:"row"}}>
                          <Text style={styles.PriceTxt}>45  minutes</Text>
                          <FontAwesome
                          style={{
                              paddingTop:20
                          }}
                            name="long-arrow-right"
                            color="#445454"
                            size={26}
                        />

                        
                         <Text style={styles.PriceTxt}>{30} Ponits</Text>
                         <IconButton 
                          color={colorbtn2}  
                          icon="checkbox-multiple-marked-circle"
                          disabled={isDisabled2}
                          size={35}
                          onPress={()=>{bookSlot(2,30);setTotalDuration(2700)}}

                        />
                      </View>

                      <View style={{flexDirection:"row"}}>
                          <Text style={styles.PriceTxt}> 1    hour  </Text>
                          <FontAwesome
                          style={{
                              paddingTop:20
                          }}
                            name="long-arrow-right"
                            color="#445454"
                            size={26}
                        />

                        
                         <Text style={styles.PriceTxt}>{3600} Ponits</Text>
                         <IconButton 
                          color={colorbtn3}  
                          icon="checkbox-multiple-marked-circle"
                          disabled={isDisabled3}
                          size={35}
                          onPress={()=>{bookSlot(3,40);setTotalDuration(7200)}}

                        />
                      </View>
                     
                      <View style={{flexDirection:"row"}}>
                          <Text style={styles.PriceTxt}> 1.30  hour  </Text>
                          <FontAwesome
                          style={{
                              paddingTop:20
                          }}
                            name="long-arrow-right"
                            color="#445454"
                            size={26}
                        />

                        
                         <Text style={styles.PriceTxt}>{50} Ponits</Text>
                         <IconButton 
                          color={colorbtn4}  
                          icon="checkbox-multiple-marked-circle"
                          disabled={isDisabled4}
                          size={35}
                          onPress={()=>{bookSlot(4,50);setTotalDuration(5400)}}

                        />
                      </View>
                       

                      <View style={{flexDirection:"row"}}>
                          <Text style={styles.PriceTxt}>  2  hours   </Text>
                          <FontAwesome
                          style={{
                              paddingTop:20
                          }}
                            name="long-arrow-right"
                            color="#445454"
                            size={26}
                        />

                        
                         <Text style={styles.PriceTxt}>{60} Ponits</Text>
                         <IconButton 
                          color={colorbtn5}  
                          icon="checkbox-multiple-marked-circle"
                          disabled={isDisabled5}
                          size={35}
                          onPress={()=>{bookSlot(5,20);setTotalDuration(7200)}}

                        />
                      </View>

                      <View>
                         

                      </View>
                  </ScrollView>
                     
               </TouchableHighlight>
               <View style={{marginBottom:10,marginTop:10,marginLeft:50,marginRight:50}}>
               <Button title="cancle" color="#00457C"
               onPress={()=>{CancleBook();  setslotPrice(0); }}/>
               </View>
                <View style={{marginLeft:50,marginRight:50}}>
                <Button title="ok"  color="#00457C"  disabled={disableOk}
                onPress={()=>{confirmBook();CancleBook()}}
                />
                </View>
           </View>

        </ScrollView>
        </Modal>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.titleSt}>Slot ID   13</Text>
        
        </View>

        <View  style={styles.timer_stl}>
       
       <CountDown
         until={totalDuration}
            digitStyle={
                {
                    backgroundColor:"#fbf2fc",
                    
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 11,
                    },
                    shadowOpacity: 0.55,
                    shadowRadius: 14.78,
                    
                    elevation: 22,
                }
               
          }

          digitTxtStyle={
              {
                  color:"#00457C",
                  fontSize:18,

              }
          }
          timeLabelStyle={
              {
                  fontSize:15,
                color:"#3e4a4d"
              }
             
          }
          timeLabels={
            {d: 'D', h: 'H', m: 'M', s: 'S'}
          
          }
         timetoShow={('H', 'M', 'S')}
         onFinish={() =>{setIsFinished(true)}}
        
         size={21}
       />
       </View>

       <Text
           style={{
               fontSize:16,
               color:"#00457C",
               marginTop:20,
               marginLeft:95
           }}
          >Extends booking time</Text>
          <TouchableOpacity
          style={styles.button}
          onPress={() =>{setPriceModaleOpen(true);}}
          >
           <Text style={styles.buttonText}>Extends Time</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancel_sty}
            onPress={()=>{setTotalDuration(0);}}>
              <Text style={{fontSize:15,color:"#043440"}}>Cancel Booking</Text>
         </TouchableOpacity>

      </View>

    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#ebf6fa",
    },
    titleSt:{
        marginLeft:90, 
        marginTop:40,
   //    marginBottom:10,
        color:"#00457C",
       fontSize:25,
       fontFamily:'BungeeInline-Regular',
    },
     
    button: {
      backgroundColor: "#00457C",
      opacity:0.9,
      marginTop:20,
      marginBottom:30,
      paddingVertical:20,
      marginHorizontal:75,
      //paddingHorizontal:80,
      borderRadius: 3,
      marginVertical: 10,
      alignItems:"center",
      justifyContent:"center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600"
    },
  
    timer_stl:{
        marginTop:2,
    },
       
    priceContainer:{
      borderWidth:2,
      borderColor:"#00457C",
      backgroundColor:"#fff",
      marginLeft:20,
      marginRight:20,
      paddingHorizontal:20,
      paddingTop:10,
      height:390,
      marginBottom:10,
   },

   PriceTxt:{
    fontFamily:'Courgette-Regular',
   paddingLeft:3,
    paddingRight:5,
    marginRight:5,
    color:"#445454",
    fontSize:15,
    paddingTop:20
 },
   

 modalToggle:{
  marginTop:20,
  backgroundColor:'#99d4e9',    
  padding:2,
  alignSelf:'center'
},
cancel_sty:{
  //paddingHorizontal:35,
  paddingVertical:20,
  borderRadius:50,
  marginHorizontal:90,
  justifyContent:'center',
  alignItems:'center',

  backgroundColor:"#fbf2fc",
              
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 11,
  },
  shadowOpacity: 0.55,
  shadowRadius: 14.78,
  
  elevation: 18,
},

});



export  default SettingScreen;