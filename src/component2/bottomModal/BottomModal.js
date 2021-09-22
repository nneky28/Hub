import React, {Component} from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {observer} from 'mobx-react'; // import { CustomAsset } from '../../../utils/assets';
import {Dimensions} from 'react-native';

import {Fragment} from 'react';
let deviceWidth = Dimensions.get('window').width;

@observer
export default class BottomModal extends Component {
  render() {
    const {showBottomModal, modalView} = this.props;
    // console.warn(showBottomModal + 'showBottomModal');

    let Modalcolor1 = this.props.Modalcolor1 || '#F43E21';
    let Modercolor2 = this.props.Modercolor2 || '#F43E21';
    // alert(this.props.modalHeight );
    return (
      <Fragment>
        <View
          style={{
            width: deviceWidth,
            flex:1,
            // height: '100%',
            // backgroundColor: 'green',
            display: 'flex',
            // left:0,
            // right: 0,
            justifyContent: 'space-between',
            // position: "absolute"
          }}>
          <View>{this.props.headerView}</View>
          <View
            style={{
              // justifyContent: 'center',
             
              alignItems: 'center',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              paddingTop: 20,
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: this.props.bgColor || '#fff',
              zIndex: 0,
              height: this.props.modalHeight || 260,
              width: "100%"
            }}>
            <View
              style={{width: '100%', display: 'flex', alignItems: 'center',}}>
              {this.props.bottomBodyContent}
            </View>
          </View>
        </View>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  closeOpenModal: {
    width: 60,
    paddingBottom: 10,
  },
  closeModallinearGradient: {
    width: '100%',
    padding: 2,
    borderRadius: 20,
  },
});
