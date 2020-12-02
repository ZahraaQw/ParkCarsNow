import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TimePicker from "react-native-24h-timepicker";

class ExtendDuration extends Component {
  constructor() {
    super();
    this.state = {
      time: "00 : 00",
      t: "00 : 00"
    };
  }


  

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();

  }

  render() {
    return (
      <View style={styles.container}>
          <Text
           style={{
               fontSize:16,
               color:"#00457C",
               marginTop:20,
           }}
          >Extends booking time</Text>
        <TouchableOpacity
          onPress={() => this.TimePicker.open()}
          style={styles.button}
        >
       <Text style={styles.buttonText}>{this.state.time}</Text>

        </TouchableOpacity>
        <TimePicker
          ref={ref => {
            this.TimePicker = ref;
          }}
            
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) =>{ this.onConfirm(hour, minute);
            this.props.triggerParentUpdate(hour, minute); }}
        />
           <TouchableOpacity style={styles.cancel_sty}
            onPress={()=>{ this.props.stope();}}>
              <Text style={{fontSize:16,color:"#043440"}}>Cancel Booking</Text>
       </TouchableOpacity>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ebf6fa",
  },
  text: {
    fontSize: 20,
    marginTop: 10
  },
  button: {
    backgroundColor: "#00457C",
    opacity:0.85,
    marginTop:20,
    marginBottom:30,
    paddingVertical:30,
    paddingHorizontal:80,
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
  cancel_sty:{
    paddingHorizontal:35,
    paddingVertical:20,
    borderRadius:50,

    backgroundColor:"#fbf2fc",
                
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    
    elevation: 18,
}


});

export default ExtendDuration;