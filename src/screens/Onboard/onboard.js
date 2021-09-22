import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import FirstSlide from './FirstSlide';
import SecondSlide from './SecondSlide';
import ThirdSlide from './ThirdSlide';
import FourthSlide from './FourthSlide';
import Swiper from './Swiper';

class Onboard extends Component {
  render() {
    return (
      <Swiper>
        <View>
          <ThirdSlide navigation={this.props.navigation} />
        </View>
        <View>
          <FirstSlide navigation={this.props.navigation} />
        </View>
        <View>
          <SecondSlide navigation={this.props.navigation} />
        </View>
        <View>
          <FourthSlide navigation={this.props.navigation} />
        </View>
      </Swiper>
    );
  }
}
export default Onboard;

const iconStyles = {
  size: 100,
  color: '#FFFFFF',
};

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  backgroundImage: {
    // height:null,
    flex: 1,
    width: null,
    // height: null,
    opacity: 2,
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});
