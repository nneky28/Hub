import React, {Component} from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {observer} from 'mobx-react'; // import { CustomAsset } from '../../../utils/assets';
import CustomizeHeader from '../../frags/CustomizeHeader';

import RBSheet from 'react-native-raw-bottom-sheet';
// import LinearGradient from 'react-native-linear-gradient';]
import {Fragment} from 'react';

@observer
export default class BottomModal extends Component {
  render() {
    const {showBottomModal, modalView} = this.props;
    // console.warn(showBottomModal + 'showBottomModal');
    if (showBottomModal === true) {
      if (this.RBSheet) {
        this.RBSheet.open();
      }
    } else {
      if (this.RBSheet) {
        this.RBSheet.close();
      }
    }
    let Modalcolor1 = this.props.Modalcolor1 || '#F43E21';
    let Modercolor2 = this.props.Modercolor2 || '#F43E21';
    // alert(this.props.modalHeight );
    return (
      <Fragment>
        <RBSheet
          closeOnPressMask={false}
          // {...this.props}
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={this.props.modalHeight || 260}
          openDuration={250}
          customStyles={{
            // wrapper: {backgroundColor: 'transparent', zIndex: 0},
            container: {
              // justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              paddingTop: 25,
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: this.props.bgColor || '#fff',
              zIndex: 0,
            },
          }}>
          <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
           
            {this.props.bottomBodyContent}
          </View>
        </RBSheet>
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
