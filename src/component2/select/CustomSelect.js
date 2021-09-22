import React, {Component} from 'react';
import {Dropdown} from 'react-native-material-dropdown-v2';

class CustomSelect extends Component {
  render() {
    let data = [
      {
        label: 'Display 2',
        value: 'Java',
      },
      {
        id: 2,
        name: 'Java',
      },
      {
        id: 2,
        name: 'Java',
      },
    ];
    const {items, onchangeSelect, selectedValue} = this.props;
    return (
      <Dropdown
      
        label={this.props.selectLable}
        data={items}
        fontSize={13}
        containerStyle={{
          borderWidth: 0,
          borderColor: '#717171',
          backgroundColor: 'yellow',
          borderRadius: 5,
          paddingBottom: 0,
        }}
        inputContainerStyle={{borderWidth: 0, borderColor: 'red'}}
        style={{
          borderWidth: 1,
          borderColor: '#717171',
          height: 48,
          borderRadius: 5,
          borderBottomWidth: 1,
        }}
        // pickerStyle={{ paddingBottom: 0}}
        onChangeText={onchangeSelect}
        value={selectedValue}
        {...this.props}
      />
    );
  }
}
export default CustomSelect;
