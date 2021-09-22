import React, {Component, Fragment} from 'react';
import {Button, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import CustomText from '../customText/CustomText';

class DeleteComponent extends Component {
  render() {
    const containerStyle = {backgroundColor: 'white', padding: 20};
    return (
      <Modal isVisible={this.props.modalVisibility}>
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: 5,
              padding: 20,
            }}>
            <View
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomText
                textSize={18}
                textWeight={'bold'}
                textcolor={'#545454'}
                displayText={this.props.modalHeader || 'Delete'}
                textStyle={{
                  marginBottom: 5,
                }}
              />
              <CustomText
                textSize={14}
                textWeight={'normal'}
                textcolor={'#545454'}
                displayText={this.props.modalTextContent || 'Are you sure you want to delete this?'}
                textStyle={{
                  marginBottom: 15,
                }}
              />
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity
              onPress={this.props.HandleDeleteAction}
                style={{
                  minWidth: '46%',
                  backgroundColor: '#FF3132',
                  height: 40,
                  borderRadius: 5,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  textSize={14}
                  textWeight={'bold'}
                  textcolor={'#fff'}
                  displayText={'Delete'}
                />
              </TouchableOpacity>
              <TouchableOpacity
              onPress={this.props.HandleCancelAction}
                style={{
                  minWidth: '46%',
                  backgroundColor: '#fff',
                  height: 40,
                  borderRadius: 5,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor:'#2898A4',
                  borderWidth:1
                }}>
                <CustomText
                  textSize={14}
                  textWeight={'normal'}
                  textcolor={'#464646'}
                  displayText={'Cancel'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default DeleteComponent;
