import React from "react";
import { View, Image,Text,TextInput,TouchableOpacity ,StyleSheet,Alert} from "react-native";

export default class PayPalAccount extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = { 
            isValidPassword:true,
            isValidEmail:true,  
            good_pass:false,
            good_email:false,  
            UserPass:'',
            Email:'', 
          //  Points:''  
         };
    
        }


  validate(text,type){
        num=/^[0-9a-zA-Z]+$/
        email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(type=='email'){
            if(email.test(text))
            {
            this.setState({
                isValidEmail:true,
                good_email:true,
            })
            }
            else{

                this.setState({
                    isValidEmail:false,
                    good_email:false,
                })
            } 
        }
        else if(type=='password'){
            if((num.test(text)) && (text.trim().length >7))
            {
            this.setState({
                isValidPassword:true,
                good_pass:true,
            })
            }
            else{

                this.setState({
                    isValidPassword:false,
                    good_pass:false,
                })
            }
        }


        }
        UserRegistrationFunction = () =>{
 
            fetch('http://192.168.1.157/php_parkProj/loginPay.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
           
           
                email: this.state.Email,
            
                password: this.state.UserPass
            
              })
            
            }).then((response) => response.json())
                  .then((responseJson) => {
                   if(responseJson == 'Login success'){
                
                  this.props.navigation.navigate("pay",{Points:this.props.route.params.Points});
                   }
                   else  {
         
                       Alert.alert("User name or password is incorrect");
    
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
                backgroundColor:"#ebf7fc"
            }}>
            <View   style={styles.container}>
                 <Image
                style={styles.stretch}
                source={require('../assets/payment2.png')}
              />
              <Text style={styles.text}>Pay With Payment System</Text>
              <Text style={styles.subtext}>Enter your email and your password to get start.</Text>
              <TextInput
                    style={{ height: 45, width:310,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:25}}
                    placeholder="Enter Your Email"
                    onChangeText={(text)=>{this.validate(text,'email');this.setState({Email: text})}}
                    />
                 {this.state.isValidEmail ? null : 
                    <View> 
                        <Text style={styles.ErrMsg}>Email must follow Email format. </Text>
                        </View>
                 }


                  <TextInput
                   secureTextEntry
                    style={{ height: 45, width:310,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:7,}}
                    placeholder="Enter Your Password"
                    onChangeText={(text)=>{this.validate(text,'password');this.setState({UserPass: text})}}
                    />

                        {this.state.isValidPassword ? null : 
                            <View> 
                                <Text style={styles.ErrMsg}>Password must be 8 long char and number  . </Text>
                                </View>
                        }

               <TouchableOpacity
              
                  style={{ opacity:!(this.state.good_pass && this.state.good_email) ? 0.5 : 1, width: 310, height: 45 ,backgroundColor:"#00457C",borderRadius:5, flexDirection:"row",alignItems:"center", justifyContent:"center",marginTop:15}}   
                  disabled={!(this.state.good_pass && this.state.good_email)}            
                  onPress={()=>{this.UserRegistrationFunction();}}    
                     > 
                    <Text style={{color:"#fff",textAlign:"center",fontSize:22,paddingLeft:3}}> Log In</Text>
                  
                </TouchableOpacity>
                <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
                <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    width:150,
                    marginTop:50
                }}
                ></View>       
                <Text style={{marginBottom:0,color:"#696969"}}>or</Text>


                 <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    width:150,
                    marginTop:50
                }}
                />
                </View>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate("CreateAccount")}
                   
                    style={{ width: 310, height: 45 ,backgroundColor:"#C0C0C0",borderRadius:5, flexDirection:"row",alignItems:"center", justifyContent:"center",marginTop:30}}    
                            
                     > 
                    <Text style={{color:"#fff",textAlign:"center",fontSize:22,paddingLeft:3}}>Create Account</Text>
                  
                </TouchableOpacity>
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
       backgroundColor:"#ebf7fc",
    },
    stretch: {
        width: 300,
        height: 180,
        resizeMode: 'stretch',
        //marginTop:55
      },
      text:{
       fontSize:25,
       color:"#696969",
       marginTop:-18

      },
      subtext:{
        fontSize:15,
        marginTop:5,
        color:"gray"
 

      },
      ErrMsg:{
        color:"red",
        fontSize:12,
        marginTop:1,
      
      
    }

});