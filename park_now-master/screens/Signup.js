import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text,View,StyleSheet, TextInput,Animated, Dimensions, TouchableOpacity,Alert,ScrollView,Linking} from 'react-native';
import { TypingAnimation } from 'react-native-typing-animation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

class Signup extends Component{

    constructor(props) {
        super(props);
        this.state = { 
            typing_email:false,
            typing_user:false,
            typing_pass:false,
            typing_conPass:false,
            isValidUser:true,
            isValidPassword:true,
            isValidEmail:true,
            isValidConPassword:true,
            animation_login:new Animated.Value(width-120),
            enable:true,
            disabled_press:false,
            UserName:'',
            UserEmail:'',
            UserPassword:'',
            UserConPassword:'',
            good_name:false,
            good_pass:false,
            good_conpass:false,
            good_email:false,
            disabled_press:true,
            registerUser:false,
           
         };
    }
      
    _foucus(value){
      

            if(value=="email"){
                this.setState(
                    {
                        typing_email:true,
                        typing_user:false,
                        typing_pass:false,
                        typing_conPass:false
                    }
                )
            }

            else  if(value=="user"){
                this.setState(
                    {
                        typing_email:false,
                        typing_user:true,
                        typing_pass:false,
                        typing_conPass:false
                    
                    }
                )
            }

            else  if(value=="pass"){
                this.setState(
                    {
                        typing_email:false,
                        typing_user:false,
                        typing_pass:true,
                        typing_conPass:false
                    
                    }
                )
            }

            else  if(value=="passC"){
                this.setState(
                    {
                        typing_email:false,
                        typing_user:false,
                        typing_pass:false,
                        typing_conPass:true
                    }
                )
            }
     
    }

  _typing(){
    return (
        <TypingAnimation 
        dotColor="#00457C"
        style={{
            position: 'absolute', 
              marginTop:30,
              marginLeft:240,
              
          }}        
        />
      );
  
  }
  _animation(){
      Animated.timing(
          this.state.animation_login,{
              toValue:50,
              duration:250
          }
      ).start();

      setTimeout(()=>{
          this.setState({
              enable:false,
              typing_email:false,
              typing_user:false,
              typing_pass:false,
              typing_conPass:false
          })
      },150);
  }
        validate(text,type){

            alph=/^[a-zA-Z]+$/
            num=/^[0-9a-zA-Z]+$/
            email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(type=='username'){
            if(alph.test(text))
            {
            this.setState({
                isValidUser:true,
                good_name:true,
            })
            }
            else{

                this.setState({
                    isValidUser:false,
                    good_name:false,
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
        else if(type=='conpassword'){
               text.trim();
            if( text == this.state.UserPassword)
            {
            this.setState({
                isValidConPassword:true,
                good_conpass:true,
            })
            }
            else{
                this.setState({
                    isValidConPassword:false,
                    good_conpass:false,
                })


            }
        }
        else  if(type=='email'){
            
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
  
        }


   

        register =async (email,password) => {
           
           try{
            await auth().createUserWithEmailAndPassword (email,password )
            var user = firebase.auth().currentUser;
            if(user){
              
                user.sendEmailVerification().then(function() {
                    user.reload();
                }).catch(function(error) {
                    console.log(error.message);
                });
            }
           }

           catch (e) {
             
            console.log(e.message);
             }
           
        

        };

 

      

        UserRegistrationFunction = () =>{
 
            fetch('http://192.168.1.157/php_parkProj/SignNew.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
            
                name: this.state.UserName,
            
                email: this.state.UserEmail,
            
                password: this.state.UserPassword
            
              })
            
            }).then((response) => response.json())
                  .then((responseJson) => {
        
                    if(responseJson == 'User Registered Successfully'){
                     
                       
                        Alert.alert(
                           'Message',
                           'Singup done successfully!! welcom in parkNow  ',
                           
                           [
                          
                             { text: 'OK', onPress: () =>{ 
                             
                               this.props.sendEmail(this.state.UserEmail)
                               this.props.openHome()
                                    
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
          Authontication =()=>{
          
            var user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function() {
                // Email sent
                console.log("email verified");
                Alert.alert("email sended"); 
            
              }

              ).catch(function(error) {
                console.log("email Not sent");

             });
        }


    render(){
         const width =  this.state.animation_login;
    return(
        
        <View  style={ styles.container } >
     
                <Text style={ styles.textSignup}> Welcome Back</Text>
                <Text style={styles.text} >Sing up! Create Account </Text>
            <ScrollView style={styles.footer}>
           <Animatable.View 
            
            animation="bounceInUp"
            duration={5000}
           >
           <ScrollView>



             <View style={styles.action}>
                 <View style={{flexDirection:"row"}}>
             <FontAwesome
                 name="user-o"
                 color="#05345a"
                 size={20}
                 style={{paddingTop:20,paddingEnd:4}}
              
              />

        <TextInput
        style={{ height:50, width:250,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:10,fontSize:12}}
        placeholder="Enter your name"
        onFocus={()=>this._foucus("user")}
     
        onChangeText={(text)=>{this.setState({ UserName: text});this.validate(text,'username');}}
        />
                        
                {this.state.typing_user ?
                 this._typing()
                  :null }
                </View>
                 </View>
                 {this.state.isValidUser ? null :  
                        <Animated.View
                        animation="fadeInLeft" duration={500}> 
                    <Text style={styles.ErrMsg}>UserName must be  just character</Text>
                    </Animated.View>
                    }

             <View style={styles.action}>
          
             <FontAwesome
                name="envelope-o"
                 color="#05345a"
                 size={20}
                 style={{paddingTop:21,paddingEnd:4}}
              
              />


            <TextInput
                    style={{ height:50, width:250,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:10,fontSize:12}}
                    placeholder="Enter your email"
                    onFocus={()=>this._foucus("email")}
                    onChangeText={(text)=>{this.setState({UserEmail: text});this.validate(text,'email');}}
                    />
                
                  {this.state.typing_email ?
                 this._typing()
                  :null }
                 </View>
                 {this.state.isValidEmail ? null : 
                    <Animated.View
                        animation="fadeInLeft" duration={500}
                        > 
                        <Text style={styles.ErrMsg}>Email must follow Email format. </Text>
                        </Animated.View>
                 }
                  
                 
             <View style={styles.action}>
                <FontAwesome
                    name="lock"
                    color="#05345a"
                    size={24}
                    style={{paddingTop:20,paddingEnd:4,marginLeft:4}}
                
                />
                   <TextInput
                    secureTextEntry

                    style={{ height:50, width:250,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:10,fontSize:12}}
                    placeholder="Enter Password"
                    onFocus={()=>this._foucus("pass")}
                    onChangeText={(text)=>{this.setState({UserPassword : text});this.validate(text,'password');}}
                    />
                 <TextInput 
                 style={styles.inputText}
                 onFocus={()=>this._foucus("")}
                 onChangeText={(text)=>this.validate(text,'')}
                 />
            {this.state.typing_pass ?
                 this._typing()
                  :null }
                 </View>
                 {this.state.isValidPassword ? null : 
                    <Animated.View
                        animation="fadeInLeft" duration={500}
                        > 
                        <Text style={styles.ErrMsg}>Password must be 8 long  . </Text>
                        </Animated.View>
                 }

             <View style={styles.action}>
             <FontAwesome
                    name="lock"
                    color="#05345a"
                    size={26}
                    style={{paddingTop:20,paddingEnd:4,marginLeft:4}}
                
                />
                  <TextInput
                    secureTextEntry

                    style={{ height:50, width:250,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:10,marginBottom:30,fontSize:12}}
                    placeholder="Confirm Password"
                    onFocus={()=>this._foucus("passC")}
                 
                    onChangeText={(text)=>{this.setState({UserConPassword : text});this.validate(text,'conpassword');}}
                    />
                
         {this.state.typing_conPass ?
                 this._typing()
                  :null }
                  
                 </View>
                 {this.state.isValidConPassword ? null : 
                    <Animated.View
                        animation="fadeInLeft" duration={500}
                        > 
                        <Text style={styles.ErrMsg}>Password not match  . </Text>
                        </Animated.View>
                 }
                 </ScrollView>
           <TouchableOpacity   
             style={{ opacity:!(this.state.good_email && this.state.good_conpass && this.state.good_pass && this.state.good_name) ? 0.5 : 1 }}
            disabled={!(this.state.good_email && this.state.good_conpass && this.state.good_pass && this.state.good_name)}
            onPress={()=>{this.UserRegistrationFunction();}}
           >
            
           <View style={styles.Butt_cont}>
               <Animated.View style={[styles. anmation,{width}]}>
                {this.state.enable?
               <Text style={styles.logText}>Sign Up</Text>
               :
               <FontAwesome
               name="check"
                color="white"
                size={20}
               /> }
                
               </Animated.View>
           </View>
           </TouchableOpacity>
           <View style={styles.signUp}>
              
               <Text style={{color:'black'}}>you already have account? </Text>
               <Text style={{color:'#f7c202'}}onPress={()=>this.props.navigation.goBack()}> Sign In</Text>

           </View>
           </Animatable.View>
           </ScrollView>

        </View>
        
    );}

}


const width = Dimensions.get("screen").width;

    const styles = StyleSheet.create({
        container: {
            flex: 2,
            backgroundColor:"white",
            justifyContent:'center',
            alignItems:"center",
            backgroundColor:"#00457C",
        },

        
        header:{
            backgroundColor:"white",
            flex:2,
            justifyContent:"center",
            alignItems:"center",
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 800,
           
            
        },

        footer:{
            marginTop:35,
            backgroundColor:"#e6e7f0",
            flex:1.5,
            paddingLeft:30,
            paddingRight:46,
            paddingTop:20,
            borderWidth:1.5,
            borderColor:"#9acdf5",
            borderTopLeftRadius:60,
            borderTopRightRadius:60,  
           

        },
        textSignup:{
            color:"#fff",
            fontSize:25,
            marginTop:40,
            fontFamily:'Lobster-Regular'
         
        },
        text:{
            color:"#f7c202",
            fontSize:15,
            marginLeft:13,
            fontFamily:'Lobster-Regular'
           
        },

        title:{
         color:"black",
         fontWeight:"bold",
            fontSize:14,
        },

        action:{
            flexDirection:"row",
           
        },

       
        inputText:{
            flex:1,
            marginTop:1,
            paddingBottom:0,
            color:"gray"
  
          },

        Butt_cont:{
            justifyContent:'center',
            alignItems:'center'
        },
         anmation:{
            backgroundColor:"#00457C",
             paddingVertical:14,
             marginBottom:12,
             marginLeft:40,
             marginRight:10,
             borderRadius:100,
             justifyContent:'center',
             alignItems:'center'
         },       
         signUp:{
             flexDirection:'row',
            justifyContent:'center',
         //   marginTop:20,
            marginBottom:30
        },
         logText:{
             color:'white',
             fontWeight:'bold',
             fontSize:14
         },
         ErrMsg:{
            color:"#c90c16",
            fontSize:10,
            paddingLeft:30,

        }

     } );



    export  default Signup;