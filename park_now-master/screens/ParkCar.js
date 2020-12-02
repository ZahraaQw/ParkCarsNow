import React, { useState,useEffect} from 'react';
import {StyleSheet,TextInput,View,Text,TouchableOpacity,ScrollView,Modal} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Duration from './Duration';
import Autocomplete from 'react-native-autocomplete-input';
 


const ParkCar=({navigation})=>{

  useEffect(() => {
    fetch('http://192.168.1.157/php_parkProj/Locations.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
            Locations=responseJson; 
          //  console.log(Locations);
            setFilms(Locations.split(','));          
          }).catch((error) => {
            console.error(error);
          });
  
  }, []);
 
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

   
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  
    let Locations="";
    let isDestAvalable= false;
    const [films, setFilms] = useState([]);  // For the main data
    const [filteredFilms, setFilteredFilms] = useState([]); // Filtered data
    const [selectedValue, setSelectedValue] = useState(); // selected data
  

    const handleConfirmDate = (date) => {
      const currentDate = date;
      setDate(currentDate);
      hideDatePicker();
    };

    const handleConfirmTime = (date) => {
      const selectedTime = date;
      setTime(selectedTime);
      hideTimePicker();
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };

    const showDatepicker = () => {
      setDatePickerVisibility(true);
    };
  
    const showTimepicker = () => {
      setTimePickerVisibility(true);
    };

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() +
          1}/${date.getFullYear()}`;
      };

      const formatTime=(time)=>{
        return ` ${time.getHours()}:${time.getMinutes()}`;
      };


      const findFilm = (query) => {
        if (query) {
          const regex = new RegExp(`${query.trim()}`, 'i');
          setFilteredFilms(
              films.filter((film) => film.search(regex) >= 0)
          );
        } else {
          setFilteredFilms([]);
        }
      };

     
            return(
          <ScrollView  style={ styles.container }>

                 <View style={{flexDirection:'row'}}>

                 <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputContainerStyle={styles.inputStl}
                    data={filteredFilms}
                    defaultValue={
                      JSON.stringify(selectedValue) === '{}' ?
                      '' :
                      selectedValue
                    }
                    onChangeText={(text) => findFilm(text)}
                    placeholder="Enter your intended destination"
                    renderItem={({item}) => (

                      <TouchableOpacity
                        onPress={() => {
                          setSelectedValue(item);
                          setFilteredFilms([]);
                        }}>
                        <Text style={styles.itemText}>
                            {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                    {
                    (selectedValue) == null ? isDestAvalable=false:isDestAvalable=true}
                    <View style={{marginTop:10,marginLeft:300,position:'absolute'}}>
                     <FontAwesome
                        name="search"
                        color="gray"
                        size={20}
                      />
                      </View>
                    </View>
                    <View >

                      <View style={styles.titleStl}>
                        <Text style={{color:"white"}}>Select Date and Strat Time</Text>
                      </View>
                       <View style={styles.date_time}>
                            <IconButton
                            icon="calendar"
                            color="#00457C"
                            size={35}
                            onPress={showDatepicker}  />
                            

                            <DateTimePickerModal
                            isVisible={isDatePickerVisible}

                            mode="date"
                            onConfirm={handleConfirmDate}
                            onCancel={hideDatePicker}
                          />
                            <Text style={styles.datetxt}>{formatDate(date)}</Text>
                            <IconButton 
                            style={{marginLeft:20}}
                           icon="clock"
                           color="#00457C"
                           size={35}
                            onPress={showTimepicker}  />
                           
                            <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            is24Hour={true}
                            onConfirm={ handleConfirmTime}
                            onCancel={hideTimePicker}
                          />

                    <Text style={styles.datetxt}>{formatTime(time)}</Text>
                           </View>
                       
                        </View>
                  
                       <View style={styles.btn_park}>
                       <TouchableOpacity style={[styles.top_bttn,{
                         marginLeft:35
                       }]}
                       disabled={!(isDestAvalable)}
                   onPress={() => {navigation.navigate('available slots',{
                    SelectDest:selectedValue,SelectDate:date,SelectTime:time
              })}}
                       >
                              <Text style={{color:"white",fontWeight:'bold'}}> SLOTS </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.top_bttn,{
                        marginLeft:10
                      }]}
                      disabled={!(isDestAvalable)}

                      onPress={() => {navigation.navigate('available Parking',{
                        SelectDest:selectedValue,SelectDate:date,SelectTime:time
                  })}}
                     >
                    <Text style={{color:"white",fontWeight:"bold"}}>PARKING</Text>
                      </TouchableOpacity>
                       </View>
                 </ScrollView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
        paddingTop:30,
        paddingLeft:10,
        paddingRight:10,
  
    },

    parktxt:{
        marginLeft:30,
        marginBottom:10,
    },

    inputStl:{
     
       borderColor:"white",
        borderBottomColor:"#00457C",
        borderBottomWidth:1.4,

        fontSize:14,
        marginLeft:10,
        width:320,
      //  marginBottom:20,
      },

      date_time:{
          marginLeft:12,
          marginRight:30,
          marginBottom:10,
          marginTop:10,
          flexDirection:'row',

      },
      datetxt:{
          marginTop:20,
          color:"#4f4d4f",
          
      },
      text: {
        fontSize: 20,
        marginTop: 10
      },
      button: {
        backgroundColor: "#4EB151",
        paddingVertical: 11,
        paddingHorizontal: 20,
        borderRadius: 3,
        marginVertical: 50
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600"
      },
      btn_park:{
        flexDirection:'row',
        backgroundColor:"#ebf6fa",
        paddingVertical:75,
      },
 
      top_bttn:{
        backgroundColor:"#6084a1",
        opacity:0.8,
        borderRadius: 3,
        paddingVertical:60,
        width:130,
        justifyContent:'center',
        alignItems:'center'
     },
     autocompleteContainer: {
      backgroundColor: '#ffffff',
      borderWidth: 0,
    
    },
      itemText: {
        fontSize: 14,
        paddingTop: 5,
        paddingBottom: 5,
        color:"#4f4d4f",
        borderBottomColor:"#becccc",
        borderBottomWidth:1.4,
       // margin: 2,
      },
      titleStl:{
        marginLeft:20,
        marginTop:50,
        marginBottom:3,
        marginRight:40,
        backgroundColor:"#6084a1",
        justifyContent:"center",
        alignItems:"center",
        height:40,
       // opacity:0.5
      }

});
export  default ParkCar;