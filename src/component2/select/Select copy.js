import React, {Component} from 'react';
import {View} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

export default class MultiSelectExample extends Component {
  state = {
    selectedItems: [],
  };

  // onSelectedItemsChange = selectedItems => {
  //   this.setState({ selectedItems });
  // };

  render() {
    const {selectedItems} = this.state;
    const {itemList} = this.props;
    return (
      <View
        style={{
          flex: 1,
          borderColor: '#81a192',
          borderWidth: 1,
          borderRadius: 6,
        }}>
        <MultiSelect
          hideTags
          items={itemList}
          uniqueKey="id"
          ref={(component) => {
            this.multiSelect = component;
          }}
          onSelectedItemsChange={this.props.ItemChange}
          selectedItems={this.props.selectedItems}
          selectText={this.props.selectName || ''}
          searchInputPlaceholderText="Search Church..."
          onChangeInput={(text) => {}}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#000"
          selectedItemIconColor="#000"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#000', height: 35}}
          styleItemsContainer={{
            borderTopWidth: 0,
            borderColor: '#81a192',
            width: '100%',
            backgroundColor: '#fff',
            marginTop: 20,
          }}
          styleDropdownMenuSubsection={{
            borderBottomWidth: 0,
            backgroundColor: 'transparent',
            paddingLeft: 5,
            paddingBottom: 0,
            paddingRight: 5,
          }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          hideSubmitButton={true}
          hideDropdown={true}
          single={true}
        />
        {/* <View>
         {this.multiSelect.getSelectedItemsExt(selectedItems)}
        </View> */}
      </View>
    );
  }
}
