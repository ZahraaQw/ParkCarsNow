import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Platform,
  Dimensions
} from 'react-native';
import MapView,
{ PROVIDER_GOOGLE, Marker, Callout, Polyline, Circle }
  from 'react-native-maps';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';

export default class FindMyPosition extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      
      myEmail:props.Email,
      SlotsId:[],
      Slots_latitude:' ',
      Slots_longitude:' ',
      SlotsInform:[],
      ParkingId:[],
      Parking_latitude:' ',
      Parking_longitude:' ',
      ParkingInform:[],
      id:'',
    
      Points:'',
      markers: [],
      intailLocation:{
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035

      },
      coor: [{
        name:"ParkNow",image:"https://www.laoistoday.ie/wp-content/uploads/2017/10/ParkingMeter.jpg",latitude:"",longitude:"",price:"reserved Slot"
      }],
      
      coordinates: [],
      
     };
     {this.CurrentBooking()}
    }

  componentDidMount() {
    this.requestLocationPermission();

  }

  CreateMapS = () =>{
 
    fetch('http://192.168.1.157/php_parkProj/CreateMap.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
        
        
          }).catch((error) => {
            console.error(error);
          });
   
  }


  CreateParkingInfo = () =>{
 
    fetch('http://192.168.1.157/php_parkProj/CreateParkingInfo.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
        
        
          }).catch((error) => {
            console.error(error);
          });
   
  }


 


 GetSlotsInfo = () =>{
 
    fetch('http://192.168.1.157/php_parkProj/getMapInfo.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
           
            this.state.SlotsId=responseJson['id'];
            this.state.Slots_latitude=responseJson['latitude'];
           this.state.Slots_longitude=responseJson['longitude'];
        
          }).catch((error) => {
            console.error(error);
          });
   
  }
  GetParkingsInfo = () =>{
 
    fetch('http://192.168.1.157/php_parkProj/getParkinfo.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
         
            this.state.ParkingId=responseJson['groupId'];
            this.state.Parking_latitude=responseJson['latitude'];
           this.state.Parking_longitude=responseJson['longitude'];
        
          }).catch((error) => {
            console.error(error);
          });
   
  }
    CreateArrays=()=>{
      this.state.SlotsId.forEach((item,index) => {
        let obj = {};
        obj.id = item;
        obj.latitude = this.state.Slots_latitude[index];
        obj.longitude = this.state.Slots_longitude[index];
        this.state.SlotsInform.push(obj);
      })
    }


    CreateArrayP=()=>{
      this.state.ParkingId.forEach((item,index) => {
        let obj = {};
        obj.id = item;
        obj.latitude = this.state.Parking_latitude[index];
        obj.longitude = this.state.Parking_longitude[index];
        this.state.ParkingInform.push(obj);
      })
    }


  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  }

 

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }

        this.setState({ initialPosition });
        this.setState({intailLocation:initialPosition});
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 1000000 }
    )
  }

  onCarouselItemChange = (index) => {
    let location = this.state.SlotsInform[index];

    this._map.animateToRegion({
      latitude: parseFloat(location.latitude),
      longitude:parseFloat(location.longitude),
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    })

    this.state.markers[index].showCallout()
  }
  onMarkerPressed = (location, index) => {
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    });

    this._carousel.snapToItem(index);
  }

  renderCarouselItem = ({ item }) =>
    <View style={styles.cardContainer}>
      
      <Text style={styles.cardTitle}>slot {item.name}</Text>
      <Text style={styles.priceTitle}>{item.price} Points</Text>
      
      <Image style={styles.cardImage} source={{uri:item.image}} />
    
    </View>


CurrentBooking=()=>{
  fetch('http://192.168.1.157/php_parkProj/readCurrentBook.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
   
    })
  
  }).then((response) => response.json())
        .then((responseJson) => {
        
        this.state.coordinates= Array(responseJson)
        this.state.id=responseJson['name']
        this.state.coordinates=  this.state.coor.concat(this.state.coordinates)
       // console.log(this.state.coordinates)
        }).catch((error) => {
          console.error(error);
        });
 
}

  render() {
    return (
      <View style={styles.container}>

          { 
           this.CreateMapS(),
           this.CreateParkingInfo(),
           this.GetSlotsInfo(),
           this.CreateArrays(),
           this.GetParkingsInfo(),
           this.CreateArrayP(),
           this.CurrentBooking()
        
         

          // console.log(this.state.coordinates)
           }

        <MapView
          provider={PROVIDER_GOOGLE}
       
          ref={map => this._map = map}
          showsUserLocation={true}
          zoomEnabled={true}
          pitchEnabled={true}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          style={styles.map}
          initialRegion={this.state.initialPosition}>

          <Circle
            center={{ latitude:this.state.intailLocation.latitude, longitude:this.state.intailLocation.longitude}}
            radius={4000}
            fillColor={'rgba(200, 300, 200, 0.5)'}
          />
     
         {this.CurrentBooking() }
       
          {
            this.state.SlotsInform.map((marker, index) => (
              <Marker
                key={index}
                ref={ref => this.state.markers[index] = ref}
               onPress={() => this.onMarkerPressed(marker, index)}
               pinColor={'blue'}
               coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
               
             >
                <Callout>
                  <Text>{marker.id}</Text>
                  
                </Callout>

              </Marker>
            ))
          }
         {
            this.state.ParkingInform.map((marker, index) => (
              <Marker
                key={index}
                ref={ref => this.state.markers[index] = ref}
                onPress={() => this.onMarkerPressed(marker, index)}
              // pinColor={'blue'}
               coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
               
             >
                <Callout>
                  <Text>{marker.id}</Text>
                  
                </Callout>

              </Marker>
            ))
          }

        </MapView>
        {this.CurrentBooking() }
         
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.coordinates}
          containerCustomStyle={styles.carousel}
          renderItem={this.renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300}
          removeClippedSubviews={false}
          onSnapToItem={() => this.onCarouselItemChange(this.state.id-1)}
        />
        {console.log(this.state.id)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 25
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 69, 124,0.5)',
    height: 200,
    width: 300,
    padding: 20,
    borderRadius: 24
  },
  cardImage: {
    height: 120,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center'
  },
  priceTitle: {
    color: '#ebf7fc',
    fontSize: 15,
    alignSelf: 'center'
  }
});