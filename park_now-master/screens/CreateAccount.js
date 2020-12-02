import React from "react";
import { View, Image,Text,TextInput,TouchableOpacity,Alert ,ScrollView,StyleSheet} from "react-native";

export default class CreateAccount extends React.Component {
       
    constructor(props) {
        super(props);
        this.state = { 
            isValidFirstName:true,
            isValidLastName:true,
            isValidPassword:true,
            isValidEmail:true,
            isValidConPassword:true,
            Email:'',
            FirstName:'',
            LastName:'',
            UserPass:'',
            conPass:'',
            good_fname:false,
            good_lname:false,
            good_pass:false,
            good_conpass:false,
            good_email:false,
            disabled_press:true,
            recivedEmail:"",

         };
    }
    GetInfo = () =>{
 
        fetch('http://192.168.1.105/php_parkProj/CurrentUser.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
                 
          })
        
        }).then((response) => response.json())
              .then((responseJson) => {
                this.state.recivedEmail=responseJson['email']
               
               console.log(Image);
               
              }).catch((error) => {
                console.error(error);
              });
    
              
       
      }
   
    validate(text,type){
        alph=/^[a-zA-Z]+$/
            num=/^[0-9a-zA-Z]+$/
            email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(type=='firstname'){
            if(alph.test(text))
            {
            this.setState({
                isValidFirstName:true,
                good_fname:true,
            })
            }
            else{

                this.setState({
                    isValidFirstName:false,
                    good_fname:false,
                })
            } 
        }
      else if(type=='lastname'){
            if(alph.test(text))
            {
            this.setState({
                isValidLastName:true,
                good_lname:true,
            })
            }
            else{

                this.setState({
                    isValidLastName:false,
                    good_lname:false,
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
        }/*
        
          text.trim();
            if( text == this.state.UserPassword)
            {
            this.setState({
                isValidConPassword:true,
                good_conpass:true,
            })
            }
        */
        else if(type=='conpassword'){
            if((num.test(text)) && (text.trim().length >7))
            {
          if( text == this.state.UserPass){
            this.setState({
                isValidConPassword:true,
                good_conpass:true,
            })
            }}
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


        UserRegistrationFunction = () =>{

 
            fetch('http://192.168.1.105/php_parkProj/SignUpPayPal.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
             
              body: JSON.stringify({
                email: this.state.Email,
                Firstname: this.state.FirstName,
                Lastname: this.state.LastName,
                password: this.state.UserPass,
                UserEmail:this.state.recivedEmail,
            
              })
            
            }).then((response) => response.json())
                  .then((responseJson) => {
                    if(responseJson=="User Registered Successfully"){
                   this.props.navigation.navigate("Contact Info",{ContactEmail:this.state.Email});
                 
                    }
                    else{
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
                backgroundColor:"#ebf7fc",
            }}>

                {this.GetInfo()}
            <View   style={styles.container}>
                 <Image
                style={styles.stretch}
                source={require('../assets/payment2.png')}
              />
              <Text style={styles.text}>Sign Up for Payment System</Text>
              <Text style={styles.subtext}>An easy way to pay and get paid</Text>
            <ScrollView>
              <TextInput
                    style={{ height: 45, width:310,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:25}}
                    placeholder="Email Address"
                  
                    onChangeText={(text)=>{this.validate(text,'email');this.setState({Email: text})}}
                    />
                      {this.state.isValidEmail ? null : 
                    <View> 
                        <Text style={styles.ErrMsg}>Email must follow Email format. </Text>
                        </View>
                 }
                  <TextInput
                    style={{ height: 45, width:310,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:7}}
                    placeholder="First name"
                   
                    onChangeText={(text)=>{this.validate(text,'firstname');this.setState({FirstName: text})}}
                    />

                     {this.state.isValidFirstName ? null : 
                    <View> 
                        <Text style={styles.ErrMsg}>UserName must be  just character</Text>
                        </View>
                    }

                   <TextInput
                    style={{ height: 45, width:310,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:7}}
                    placeholder="Last name"
                    onChangeText={(text)=>{this.validate(text,'lastname');this.setState({LastName: text})}}
                    />
                    
                    {this.state.isValidLastName ? null : 
                    <View> 
                        <Text style={styles.ErrMsg}>UserName must be  just character</Text>
                        </View>
                    }
                        <TextInput
                    style={{ height: 45, width:310,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:7}}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(text)=>{this.validate(text,'password');
                    this.setState({UserPass: text})}}
                    />
                       {this.state.isValidPassword ? null : 
                    <View> 
                        <Text style={styles.ErrMsg}>Password must be 8 long  . </Text>
                        </View>
                 }
                    

                        <TextInput
                    style={{ height: 45, width:310,borderColor: 'gray', borderWidth: 1 ,borderRadius:5,marginTop:7}}
                    placeholder="Confirm Password"
                    secureTextEntry
                       
                    onChangeText={(text)=>{this.validate(text,'conpassword');
                    this.setState({conPass: text})}}
                    />
                     {this.state.isValidConPassword ? null : 
                    <View> 
                        <Text style={styles.ErrMsg}>Password must be 8 long or must Password not match  . </Text>
                        </View>
                 }

          
               <TouchableOpacity      
                style={{ opacity:!(this.state.good_email && this.state.good_conpass && this.state.good_pass && this.state.good_lname&&this.state.good_fname) ? 0.5 : 1,width: 310, height: 45 ,backgroundColor:"#00457C",borderRadius:5, flexDirection:"row",alignItems:"center", justifyContent:"center",marginTop:20}}                
                disabled={!(this.state.good_email && this.state.good_conpass && this.state.good_pass && this.state.good_lname&&this.state.good_fname)}
                onPress={this.UserRegistrationFunction}
                    > 
                    <Text style={{color:"#fff",textAlign:"center",fontSize:22,paddingLeft:3}}>Next</Text>
                </TouchableOpacity>
                <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
                      
             </View>
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
        backgroundColor:"#ebf7fc",
    },
    stretch: {
        width: 300,
        height: 180,
        resizeMode: 'stretch',
      //  marginTop:50,
        marginLeft:-1
      },
      text:{
       fontSize:25,
       color:"#696969",
       marginTop:-35

      },
      subtext:{
        fontSize:15,
        marginTop:5,
        color:"gray"
 

      },
      ErrMsg:{
        color:"red",
        fontSize:12,
        marginTop:1

    }

});