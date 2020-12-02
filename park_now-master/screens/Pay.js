import React from "react";
import { View, Text, Image,TouchableOpacity, Modal,Alert, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            Fname:'',
            Lname:'',
            Address:'',
            city:'',
            phone:'',
            Balance:'',
            Email:'', 
            Cache:''  
         };
         {this.GetInfo()}
        }

       GetInfo = () =>{
 
            fetch('http://192.168.1.157/php_parkProj/PInfoD.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                     
              })
            
            }).then((response) => response.json())
                  .then((responseJson) => {
                    this.setState({Fname: responseJson['Fname']});
                    this.setState({Lname: responseJson['Lname']});
                    this.setState({city: responseJson['city']});
                    this.setState({phone: responseJson['phone']});
                    this.setState({Email: responseJson['email']});
                    this.setState({Address: responseJson['Address']});
                    this.setState({Balance: responseJson['Balance']});


                    
                  
                   
                  }).catch((error) => {
                    console.error(error);
                  });
           
          }

          UserRegistrationFunction = () =>{

 
            fetch('http://192.168.1.157/php_parkProj/PayPoints.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
             
              body: JSON.stringify({
                email: this.state.Email,
                Cache: this.props.route.params.Points,
               
            
              })
            
            }).then((response) => response.json())
                  .then((responseJson) => {
                    if(responseJson=="Pay now"){

                      
                   this.props.navigation.navigate("check");
                 
                    }
                    else if(responseJson == 'Error'){
                       

                        Alert.alert(
                          'Message',
                          'Your balance does not allow you to assign points!! ',
                          
                          [
                         
                            { text: 'OK', onPress: () =>{ 
                              //this.props.sendEmail(this.state.UserEmail)
                              this.props.navigation.navigate("Home");
                                   
                              } }
                          ],
                          { cancelable: false }
                        )
                  
                    }
                  


           
                  }).catch((error) => {
                   console.error(error);
                  });
           
          }
        

    render() {
        return (
          
            <View>
             
          
            <View  style={styles.inner}>
            <Image
                 style={styles.stretch}
                source={require('../assets/payment2.png')}
              />
           
              <View  style={styles.inner2}>
              <Icon style={{color:"#99D4E9", marginTop:4,marginRight:5}} name='shopping-cart' size={23} />
              <Text style={{fontSize:20,marginRight:3,marginLeft:5}}>₪</Text>
            <Text style={{marginRight:5}}>{this.props.route.params.Points}</Text>
              </View>
            </View>

            <View style={{backgroundColor:"#F0F8FF",height:70,borderBottomColor: '#D3D3D3',
            borderBottomWidth: 1,}}>
                <Text style={{marginLeft:15,marginTop:24}}>Hi,{this.state.Fname}</Text>
            </View>
            <View>
                <Text style={{color:"#B6B6B4", fontSize:25, marginTop:24,marginLeft:15}}>Ship to </Text>
                <Text style={{ fontSize:19, marginTop:15,marginLeft:15}}>{this.state.Fname} {this.state.Lname}</Text>
                <Text style={{color:"#848482", fontSize:16,marginLeft:15}}>{this.state.Address}, {this.state.city}</Text>

            </View>
              
            <View
                style={{
                    borderBottomColor: '#D3D3D3',
                    borderBottomWidth: 1,
                    width:"100%",
                    marginTop:22
                }}
                />
                <View>
                    <Text style={{color:"#B6B6B4",fontSize:20, marginTop:24,marginLeft:15}}>Pay With</Text>
                     <View style={styles.inner2}>
                         <View style={{ flexDirection:"row",
                       }}>
                           <View style={{   width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor:"#E5E4E2",
                                        marginTop:15,
                                        marginLeft:15,
                                        justifyContent:"center",
                                        alignItems:"center",
                                        textAlign: "center",

                                        }}>
                     <Icon style={{color:"#00457C"}} name='paypal'  size={22} />
                     </View>
                     <Text style={{fontSize:17,marginLeft:12,marginTop:24}}>Balance</Text>
                     </View>
                     <Text style={{marginRight:60,marginTop:24}}> ₪ {this.state.Balance}</Text>
                     </View>

                </View>
                <View
                style={{
                    borderBottomColor: '#D3D3D3',
                    borderBottomWidth: 1,
                    width:"100%",
                    marginTop:22
                }}
                />
                <View style={{marginTop:10}}>

                <TouchableOpacity
                  style={{ width: 310, height: 45 ,marginLeft:21,marginTop:20,backgroundColor:"#00457C",borderRadius:5, flexDirection:"row",alignItems:"center", justifyContent:"center",marginTop:30}}                
                  onPress={this.UserRegistrationFunction}
                 > 
            <Text style={{color:"#fff",textAlign:"center",fontSize:22,paddingLeft:3}}>Pay Now</Text>
                  
                </TouchableOpacity>
                </View>
                
            </View>
           
        );
    }
}


const styles = StyleSheet.create({
    container:{
     backgroundColor:"#fff",
    flex:1,
   

    },
    stretch: {
        width: 140,
        height: 100,
        resizeMode: 'stretch',
        marginTop:5
      },
   inner:{
    flexDirection:"row",
    alignItems:"center", 
    backgroundColor:"#fff",
    justifyContent: 'space-between',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    height:75
   
   },
   inner2:{
    flexDirection:"row",
    alignItems:"center", 
    justifyContent: 'space-between',}
});