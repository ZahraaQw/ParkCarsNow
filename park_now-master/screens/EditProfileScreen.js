import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';

const EditProfileScreen = ({navigation}) => {

  const [image, setImage] = useState('https://developers.google.com/web/images/contributors/no-photo.jpg');
  const [city, setCity] = useState("");
  const[phone,setPhone]=useState("");
  const[palatte,setPalatte]=useState("");
  const[Fname,setFname]=useState("");
  const[Lname,setLname]=useState("");
  const[email,setEmail]=useState("");
  const[userName,setUserName]=useState("");
  const {colors} = useTheme();

  const [isValidFname,setIsValidF]=useState(true);
  const [isValidLname,setIsValidL]=useState(true);
  const [isValidPhone,setIsValidP]=useState(true);
  const [isValidCity,setIsValidC]=useState(true);
  const [isValidPalte,setIsValidN]=useState(true);
  
  const[goodFname,setGoodF]=useState(false);
  const[goodLname,setGoodL]=useState(false);
  const[goodPhone,setGoodP]=useState(false);
  const[goodCity,setGoodC]=useState(false);
  const[goodNumber,setGoodN]=useState(false);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);

  const GetInfo = () =>{
 
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
            setEmail(responseJson['email']);
            setUserName(responseJson['name']);
          
        
          }).catch((error) => {
            console.error(error);
          });
   
  }
  const SaveProfileInfo = () =>{
 
    fetch('http://192.168.1.157/php_parkProj/EditProfile.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email:email,
          city:city,
          phone:phone,
          palatte:palatte,
          FirstName:Fname,
          LastName:Lname,
          image:image,
 
          
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
            Alert.alert(responseJson);
          }).catch((error) => {
            console.error(error);
          });
   
  }
  
  validate=(text,type)=>{

    alph=/^[a-zA-Z]+$/
    num=/^[0-9a-zA-Z]+$/
  //  email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
   if(type=='Firstname'){
    if(alph.test(text))
    {
      setIsValidF(true);
      setGoodF(true);
    }
    else{

      setIsValidF(false);
      setGoodF(false);
    } 
}


   else  if(type=='Lastname'){
    if(alph.test(text))
    {
      setIsValidL(true);
      setGoodL(true);
    }
    else{
      setIsValidL(false);
      setGoodL(true);

    } 
}

      else if(type=='Phone'){
      if((num.test(text)) && (text.trim().length == 10))
      {
        setIsValidP(true);
        setGoodP(true);
      }
      else{
        setIsValidP(false);
        setGoodP(false);
      }
      }
      else   if(type=='carNumber'){
        if((num.test(text)) && (text.trim().length ==7))
        {
          setIsValidN(true);
          setGoodN(true);
     
        }
        else{
          setIsValidN(false);
          setGoodN(false);

        }
         
    
       }

       else  if(type=='city'){
        if(alph.test(text))
        {
          setIsValidC(true); 
          setGoodC(true);    
           }
        else{
          setIsValidC(false);    
          setGoodC(false);    
  
        } 
    }

  }
  return (
      <ScrollView  style={styles.container}>
        {GetInfo()}
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
    }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            {userName}
          </Text>
        </View>
      
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(text)=>{setFname(text);validate(text,'Firstname')}}
          />
        </View>
                {isValidFname ? null :  
                       <Animated.View
                       animation="fadeInLeft" duration={500}> 
                   <Text style={styles.ErrMsg}>FirstName must be  just character</Text>
                   </Animated.View>
                    }
                 
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(text)=>{setLname(text);validate(text,'Lastname')}}
          />
        </View>
        {isValidLname ? null :  
                       <Animated.View
                       animation="fadeInLeft" duration={500}> 
                   <Text style={styles.ErrMsg}>LastName must be  just character</Text>
                   </Animated.View>
                    }
        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(text)=>{setPhone(text);validate(text,'Phone')}}
          />
        </View>
        {isValidPhone ? null :  
                       <Animated.View
                       animation="fadeInLeft" duration={500}> 
                   <Text style={styles.ErrMsg}>Phone number should be 10 digit</Text>
                   </Animated.View>
                    }


        <View style={styles.action}>
          <FontAwesome name="car" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Car ID"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(text)=>{setPalatte(text);validate(text,'carNumber')}}
          />
        </View>
        {isValidPalte ? null :  
                       <Animated.View
                       animation="fadeInLeft" duration={500}> 
                   <Text style={styles.ErrMsg}>Car palette number must be 7 long </Text>
                   </Animated.View>
                    }
        <View style={styles.action}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(text)=>{setCity(text);validate(text,'city')}}
          />
        </View>
        {isValidCity? null :  
          <Animated.View
          animation="fadeInLeft" duration={500}> 
      <Text style={styles.ErrMsg}>City name must be just character  </Text>
      </Animated.View>
      }
      
        <TouchableOpacity style={styles.commandButton} 
            style={[styles.commandButton,{ opacity:!(goodFname && goodLname && goodPhone && goodCity && goodNumber) ? 0.5 : 1 }]}
            disabled={!(goodFname && goodLname && goodPhone && goodCity && goodNumber)}
             onPress={() => {SaveProfileInfo()}}>

          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
      
    </ScrollView>
    
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 8,
    borderRadius: 10,
    height:55,
    backgroundColor: '#00457C',
    justifyContent:'center',
    alignItems: 'center',
   // marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#5b98c9',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
   // marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 3,
  },
  textInput: {
    flex: 1,
    marginTop: -16,
    paddingLeft: 30,
    color: '#05375a',
  },
  ErrMsg:{
    color:"#c90c16",
    fontSize:10,
    paddingLeft:30,

}
});
