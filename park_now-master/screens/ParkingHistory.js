import React, { Component } from "react";
import { View, Text, FlatList, LogBox } from "react-native";
import { ListItem, SearchBar ,Card} from "react-native-elements";

//LogBox.ignoreAllLogs();
 
class ParkingHistory extends Component {
 
  
  constructor(props) {
    super(props); 
  
    this.state = { 
      loading: false,  
      UserEmail:'', 
      id:[],
      name:[],
      email:[],
      slotId:[],
      price:[],
      car:[],
      data: [],
      temp: [],
      error: null,
      search: null
    };
    {this.GetInfo()
     //this.GetHistory()
   //  console.log(this.UserEmail)
    }
  }
   HistoryInfo=[];
 
   GetInfo = () =>{
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
        
           this.setState({UserEmail:responseJson['email']});
           this.GetHistory();
        
          }).catch((error) => {
            console.error(error);
          });
   
  }

  GetHistory= () =>{
 
    fetch('http://192.168.1.157/php_parkProj/GetHistory.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       email:this.state.UserEmail
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({id:responseJson['id']}),
            this.setState({name:responseJson['name']}),
            this.setState({email:responseJson['email']})
            this.setState({slotId:responseJson['slotId']})
            this.setState({car:responseJson['car']})
            this.setState({price:responseJson['price']})
            console.log(this.state.id)
            console.log(this.state.name)
            console.log(this.state.email)
            this.CreateArray()
            this.setResult(this.HistoryInfo)
          //  console.log(this.HistoryInfo)



          }).catch((error) => {
            console.error(error);
          });
   
  }


  CreateArray=()=>{
    this.state.id.forEach((item,index) => {
      let obj = {};
      obj.id = item;
      obj.name = this.state.name[index];
      
      obj.email ="Parking or Slot ID "+this.state.slotId[index]+"\n"+"start time : "+this.state.email[index]+"\n"+"Price  "+this.state.price[index]+"\n"+"car Palate  "+this.state.car[index];
      this.HistoryInfo.push(obj);
    })
  }

 
  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      temp: [...this.state.temp, ...res],
      error: res.error || null,
      loading: false
    });
  }
 
  renderHeader = () => {
      return <SearchBar placeholder="Search Here..."
          lightTheme round editable={true}
          value={this.state.search}
          onChangeText={this.updateSearch} />; 
  }; 
 
  updateSearch = search => {
        this.setState({ search }, () => {
            if ('' == search) {
                this.setState({
                    data: [...this.state.temp]
                });
                return;
            }
             
            this.state.data = this.state.temp.filter(function(item){
                return item.name.includes(search);
              }).map(function({id, name, email}){
                return {id, name, email};
            });
        });
  };
 
  render() {
    
    return (   
          <View>
          <FlatList 
          
            ListHeaderComponent={this.renderHeader}
            data={this.state.data}
            keyExtractor={item => item.email}
            renderItem={({ item }) => (
              <ListItem
              roundAvatar
              bottomDivider
              title={`${item.name}`}
              subtitle={item.email}
              
          >
            
          </ListItem>
          
          
        )}
      />
      </View>
    );
  }
}
 
export default ParkingHistory;