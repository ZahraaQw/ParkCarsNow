import React from "react";
import { View, Text, TouchableOpacity, Modal,TextInput, StyleSheet,Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class PaymentScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            text:" ",
            isValidNumber:true,
            good_Points:false,
           
         };
    }
     
   
    
      
    validate(text){
     num=/[0-9]+$/
     if(num.test(text)&&(text.trim().length<5))
     {
     this.setState({
        isValidNumber:true,
        good_Points:true, 
     })
     }
     else{

         this.setState({
            isValidNumber:false,
            good_Points:false, 
         })
     } 

    }

   
    render() {
        return (
            <View style={{ flex:1,backgroundColor:"#ebf7fc"}}> 

                  <Image
                style={styles.stretch}
                source={require('../assets/payment2.png')}
              />
             <ScrollView>
                <View style={{  
                                justifyContent:"center",
                                alignItems:"center",
                                borderColor: '#00457C',
                                borderWidth: 1.5,
                               // marginTop:10,
                                marginLeft:5,
                                marginRight:5,
                                paddingBottom:40,
                                borderRadius:5
                               
                               }}>
                   
                    <Text style={{fontSize:22,color:"#696969", marginTop:30}}>Pay 5₪ To Get 10 Points... </Text>
                            <Text style={{fontSize:12,color:"#C0C0C0", marginVertical:5}}>Points {this.state.text} need {(5*(this.state.text))/10} ₪</Text>
                    <TextInput
                    style={{ height: 50, width:300,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:10,}}
                    placeholder="Enter Number of Points"
        
                    
                     
                    onChangeText={text => this.setState({ text },
                        () => this.validate(text))}

                    />
                   {this.state.isValidNumber ? null :  
                    <View> 
                    <Text style={styles.ErrMsg}>Points must be Number </Text>
                    </View>
                    }
                   <TouchableOpacity
                    style={{ opacity:!(this.state.good_Points)? 0.5 : 1,width: 300, height: 50 ,backgroundColor:"#00457C",borderRadius:5, flexDirection:"row",alignItems:"center", justifyContent:"center",marginTop:10}}                
                    disabled={!(this.state.good_Points)}    
                    onPress={()=>this.props.navigation.navigate("PayAccount",{Points:5*this.state.text/10})}
                     >
                      <Icon style={{color:"#00BFFF"}} name='paypal'  size={22} />
                    <Text style={{color:"#fff",textAlign:"center",fontSize:22,paddingLeft:3}}> Payment System</Text>
                  
                </TouchableOpacity>
               
                </View>
                </ScrollView>
              
            </View>
        );
    }
}


const styles = StyleSheet.create({
    inputText:{
        flex:1,
        color:"gray", 
        width:300,
        height:100

      },
      ErrMsg:{
        color:"red",
        fontSize:12,
        marginTop:1

    },
    stretch: {
        width: 300,
        height: 170,
        resizeMode: 'stretch',
      //  marginTop:10,
        marginLeft:25
      }

});