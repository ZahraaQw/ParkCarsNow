import React, { useState,useEffect } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,Modal,Button,Alert} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { IconButton, Colors } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import ReviewFormP from './FormikReviewP';
import { TouchableHighlight } from 'react-native-gesture-handler';




const Parking=({navigation,route})=>{
    
    let SelectTime=route.params.SelectTime;
    let SelectDate=route.params.SelectDate;
    let SelectDest=route.params.SelectDest;
    const[isColored,setisColored]=useState(false);

    const [modalOpen, setModaleOpen] = useState(false);
    const [SlotIdTitle,setSlotId] = useState("0");
    const[ParkingName,setParkingName] = useState();
    const[price,setprice] = useState();
    const[ids,setids]=useState([]);
    const[isAvailbe,setisAvailbe]= useState([]);
    const[childId,setchildId]=useState();
    const [UserEmail,setUserEmail] = useState();
    const [priceModalOpen, setPriceModaleOpen] = useState(true);

    var slotinfo2=[];

 
  
    const formatDate = (date) => {
      return `${date.getDate()}-${date.getMonth() +
        1}-${date.getFullYear()}`;
    };
  
    const formatTime=(time)=>{
      return ` ${time.getHours()}:${time.getMinutes()}`;
    };

    CreateArray=()=>{
      ids.forEach((item,index) => {
        let obj = {};
        obj.id = item;
        obj.isAvaliable = isAvailbe[index];
        slotinfo2.push(obj);
      })
  
    }

  GetParking= () =>{
 
    fetch('http://192.168.1.157/php_parkProj/getParking.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      
        destination: SelectDest,
        sdate:formatDate(SelectDate),
        stime:formatTime(SelectTime),


        
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
            
            setParkingName(responseJson['ParkingName']);
            setids(responseJson['ids']);
            setprice(responseJson['price']);
            setisAvailbe(responseJson['isAvilable']);
            setchildId(responseJson['childId']);

          }).catch((error) => {
            console.error(error);
          });
   
  }
  const GetEmail = () =>{
 
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
  const GoPayPal=()=>{
    navigation.navigate('PayAccount');
  }

  const BuyPoints=()=>{
    navigation.navigate('Payment');
  }

  const BackHome=()=>{
    setModaleOpen(false);
    navigation.navigate('available Parking');
    GetParking();
   setisColored(true);
   SetCurrentBooking(); 

  }

  
  useEffect(() => {
  });
   
  const confirmBook=()=>{
    setPriceModaleOpen(false);

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
  let Reserve=0;
  let Empty= 0;


    return(
    <View style={styles.container}>
         {
          CreateArray(),
          GetEmail()
      // console.log(ids)
         }
        < ScrollView style={styles.Boody}>
         <TouchableOpacity>
             <View  style={styles. top_bttn}>
            <Text>{ParkingName}</Text>
             </View>
         </TouchableOpacity>
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
        <TouchableOpacity>
             <View  style={[styles.slotContaier,{width:300,marginLeft:30,height:300,padding:8}]}>
                <Text style={{fontSize:35,color:"#00457C",fontFamily:'Courgette-Regular'}}>Welcome to</Text>
                <Text style={{fontSize:22,color:"gold",fontFamily:'Courgette-Regular'}}>Municipal parking</Text>

              

                </View>
         </TouchableOpacity>
              
                <TouchableOpacity  onPress={()=>{GetParking(),confirmBook()}}
                 style={styles.OkBtn}>
                   <Text style={{color:"white",fontSize:20}}>OK</Text>
                 </TouchableOpacity>
     
     
             
           </View>

        </ScrollView>
        </Modal>

         <Modal  visible={modalOpen} animationType="slide">
             <ScrollView style={styles.ModalContent}>
             <IconButton 
               style={styles.modalToggle}
               icon="close"
               color="#00457C"
               size={20}
               onPress={() =>setModaleOpen(false)}
           />
         
           <TouchableOpacity>
             <View  style={styles.slotContaier}>
                <Text style={{fontSize:35,color:"#00457C",fontFamily:'Courgette-Regular'}}>Slot</Text>
                <Text style={{fontSize:25,color:"#00457C",fontWeight:'bold'}}>{SlotIdTitle}</Text>
                <View style={{flexDirection:'row'}}>  
                    <Text style={{fontSize:22,color:"#07243b",fontFamily:'Courgette-Regular'}}>Price:{price} </Text>
                <FontAwesome
                name="money"
                 color="gold"
                 size={30}
              /></View>

                </View>
         </TouchableOpacity>
         <ReviewFormP id={SlotIdTitle} ChId={childId}  Price={price} Time={formatTime(SelectTime)}
               Dat={SelectDate} Uemail={UserEmail}
               goToPay={GoPayPal} buyPoints={BuyPoints}  goHome={BackHome}
               />
               </ScrollView>
               </Modal>
 
         <View style={styles.car_view}>
         { 
            ids.map((item,index)=>
            <View  key={item}  style={{
            
               width:50,
               height:62
               

            }}>


              <IconButton 
             color= {(isColored && (SlotIdTitle==item))?"green":"#2f5d82"}
             disabled={(isAvailbe[index]=="false")? true: false}
              icon="car"
              size={50}
              onPress={() =>{setModaleOpen(true);setSlotId(item)}}
           />

            </View>
           )
            }

        
            </View>
     
     

        </ ScrollView>

      <View style={styles.Footer}>
      <Text style={styles.text}>Empty: {Empty=(slotinfo2.filter(item=>(item.isAvaliable=="true")).length)} </Text>        
        <Text style={styles.text}> Reserve: {Reserve= slotinfo2.length-Empty} </Text> 
      </View>
    </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Boody:{
        flex:0.5,
        backgroundColor:"white",
        
          
      },
    Footer:{
        flex:0.12,
        backgroundColor:"#00457C",
        flexDirection:'row',
        paddingLeft:25,
        

    },
    text:{
        color:"#99d4e9",
        fontSize:13,
        paddingLeft:25,
        fontWeight:"bold",
        paddingTop:16,

    },
    txt_l:{
        flexDirection:"column"
    },
    top_bttn:{
       // backgroundColor:"#6f1282",
       backgroundColor:"#678691",
       opacity:0.4,
        paddingVertical:12,
        marginTop:5,
        marginLeft:65,
        marginRight:65,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center'
    },

    OkBtn:{
      backgroundColor:"#36648a",
       paddingVertical:20,
       marginTop:5,
       marginLeft:65,
       marginRight:65,
       marginBottom:10,
       borderRadius:10,
       justifyContent:'center',
       alignItems:'center'
    },
    view_btns:{
        flexDirection:'column',

    },
     car_view:{
        // flex:1,
         flexWrap:"wrap",
         flexDirection:'row',
         marginLeft:12

     },

     modalToggle:{
         marginTop:20,
         backgroundColor:'#99d4e9',    
         padding:2,
         alignSelf:'center'
     },
     ModalContent:{
         flex:1,
         backgroundColor:"#ebf6fa",
     },
     slotContaier:{
        //backgroundColor:"gray",
         paddingVertical:25,
         marginTop:35,
         marginLeft:100,
         marginRight:100,
         marginBottom:40,
         justifyContent:'center',
         alignItems:'center',
         borderRadius:40,
         borderWidth:4,
         borderColor:"white",
     },


});
export default Parking;