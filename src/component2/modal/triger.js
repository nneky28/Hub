import React, {Component} from 'react';
import {Text, Modal, View} from 'react-native';
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
//import {withNavigation} from 'react-navigation';

import Image from '../image/Image';
import CustomText from '../customText/CustomText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Fragment} from 'react';

class ModalExample extends Component {
  state = {visible: true};

  render() {
    return (
      <Fragment>
        <MenuProvider
          style={{
            flexDirection: 'column',
            padding: 0,
            width: 15,
            marginLeft: 105,
          }}>
          {this.props.popUpContent}
        </MenuProvider>
      </Fragment>
    );
  }
}

export default ModalExample
//withNavigation(ModalExample);
