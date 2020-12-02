import React from 'react';
import { StyleSheet, Text, View,Dimensions, Easing } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const MAX_POINTS = 30;
export default class Check extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
  
        isMoving: false,
        pointsDelta: 0,
        points: 1,
    };}

    componentDidMount(){
      this.circularProgress.animate(100, 900,Easing.linear);
    
      this.intervalId = setInterval(
        () => this.circularProgress.reAnimate(0,100, 900,Easing.linear),
        900
      );
      this.timeoutHandle= setTimeout(() => {
     this.props.navigation.navigate('Payment')
    }, 4000); 
    }
    
    componentWillUnmount() {
      clearInterval(this.intervalId);
     clearTimeout(this.timeoutHandle); 
    }

    render() {
        const { width } = Dimensions.get("window");
        const window = width - 120;
       // const fill = (this.state.points / MAX_POINTS) * 100;
        return (
         
            <View style={styles.container} >

            <AnimatedCircularProgress
                size={window}
                width={7}
                backgroundWidth={5}
                fill={0}
                tintColor="#a3c5e3"
                backgroundColor="#2c6ea8"
                ref={(ref) => this.circularProgress = ref}
                arcSweepAngle={360}
                rotation={360}
                lineCap="round"
              //  onAnimationComplete={() => console.log('onAnimationComplete')}
            >
                {fill => <Text style={styles.points}>Processing</Text>}

            </AnimatedCircularProgress>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    points: {
        textAlign: 'center',
        color: '#1f64a1',
        fontSize: 35,
        fontWeight: '100',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F0F8FF',
        padding: 50,
       // marginTop:90
    },
    pointsDelta: {
        color: '#4c6479',
        fontSize: 50,
        fontWeight: '100',
    },
    pointsDeltaActive: {
        color: '#fff',
    },
});