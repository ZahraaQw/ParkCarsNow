import React from "react";
import { View, Image,Text,TextInput,TouchableOpacity,ScrollView ,StyleSheet,Alert} from "react-native";

export default class ContactInfopay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isValidAddress1:true,
            isValidCity:true,
            isValidPhone:true,
            Address:'',
            Phone:'',
            City:'',
            good_Address:false,
            good_Phone:false,
            good_City:false,
            disabled_press:true,
         };
    }

    getEmal(){
      //  const { navigation } = this.props;
       // console.log(parms.ContactEmail);
      // console.log(this.prop.);
      console.log(this.props.route.params.ContactEmail);
    }

    validate(text,type){
        alph=/^[a-zA-Z]+$/
        num=/^[0-9]+$/


        if(type=='address1'){
            if(alph.test(text))
            {
            this.setState({
                isValidAddress1:true,
                good_Address:true,
            })
            }
            else{

                this.setState({
                    isValidAddress1:false,
                    good_Address:false,
                })
            } 
        }
    
        else if(type=='city'){
            if((alph.test(text)))
            {
            this.setState({
                isValidCity:true,
                good_City:true,
            })
            }
            else{

                this.setState({
                    isValidCity:false,
                    good_City:false,
                })
            }
        }
        else if(type=='phone'){
            if((num.test(text)) && (text.trim().length >9))
            {
            this.setState({
                isValidPhone:true,
                good_Phone:true,
            })
            }
            else{

                this.setState({
                    isValidPhone:false,
                    good_Phone:false,
                })
            }
           
        }


    }
    UserRegistrationFunction = () =>{

        fetch('http://192.168.1.105/php_parkProj/SignUp2PayPal.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
         
          body: JSON.stringify({
            email:this.props.route.params.ContactEmail,
            address: this.state.Address,
            phone: this.state.Phone,
            city: this.state.City
          })
        
        }).then((response) => response.json())
              .then((responseJson) => {
             if(responseJson == 'User Registered Successfully'){
                Alert.alert(
                   'Message',
                   'Singup done successfully',
                   [
                     { text: 'OK', onPress: () =>{ 
                        this.props.navigation.navigate("PayAccount");  
                       } }
                   ],
                   { cancelable: false }
                 )
          }
           else {
              
              Alert.alert(responseJson);
               }

              }).catch((error) => {
               console.error(error);
              });
       
      }

      
    render() {
        return (
            <View style={{

                flex: 1,
                justifyContent:"center",
                alignItems:"center",
                textAlign: "center",
                backgroundColor:"#fff"
            }}>
            <View   style={styles.container}>
                 <Image
                style={styles.stretch}
                source={require('../assets/payment2.png')}
              />
              {this.getEmal()}
              <Text style={styles.text}>Let's start with your contact </Text>
              <Text style={{fontSize:23,color:"#696969"}}>information</Text>
              <Text style={styles.subtext}>We'll need this information to update your account</Text>
              <ScrollView>
              <TextInput
                    style={{ height: 45, width:310,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:20}}
                    placeholder="Address Line"
                    onChangeText={(text)=>{this.validate(text,'address1');this.setState({Address: text})}}
                    />
                      {this.state.isValidAddress1 ? null : 
                    <View> 
                        <Text style={styles.ErrMsg}>Address must be  just character</Text>
                        </View>
                    }
                

                   <TextInput
                    style={{ height: 45, width:310,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:7}}
                    placeholder="City"
                    onChangeText={(text)=>{this.validate(text,'city');this.setState({City: text})}}
                    />
                     {this.state.isValidCity ? null : 
                    <View> 
                        <Text style={styles.ErrMsg}>City must be  just character</Text>
                        </View>
                    }

                        <TextInput
                    style={{ height: 45, width:310,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:7}}
                    placeholder="Phone"
                    onChangeText={(text)=>{this.validate(text,'phone');this.setState({Phone: text})}}
                    />
                     {this.state.isValidPhone ? null : 
                    <View> 
                        <Text style={styles.ErrMsg}>phone must be  just Number</Text>
                        </View>
                    }
                  
               <TouchableOpacity
                   
                   style={{ opacity:!(this.state.good_Address && this.state.good_Phone && this.state.good_City) ? 0.5 : 1, width: 310, height: 45 ,backgroundColor:"#00457C",borderRadius:5, flexDirection:"row",alignItems:"center", justifyContent:"center",marginTop:25}}                
                   disabled={!(this.state.good_Address && this.state.good_Phone && this.state.good_City)}
                   onPress={this.UserRegistrationFunction}
                   > 
                    <Text style={{color:"#fff",textAlign:"center",fontSize:22,paddingLeft:3}}>Sign Up</Text>
                  
                </TouchableOpacity>
              
                </ScrollView>
                     </View>
                     
            
        </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        textAlign: "center",
        backgroundColor:"#ebf6fa"
    },
    stretch: {
        width: 300,
        height: 180,
        resizeMode: 'stretch',
       // marginTop:50
      },
      text:{
       fontSize:23,
       color:"#696969",
       marginTop:-30,
       marginLeft:16

      },
      subtext:{
        fontSize:15,
        marginTop:5,
        marginLeft:16,
        color:"gray"
 

      },
      ErrMsg:{
        color:"red",
        fontSize:12,
        marginTop:1

    }

});