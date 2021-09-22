import React, {Component} from 'react';
import {View} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

let items = [
  {
    id: '92iijs7yta',
    name: 'Ondo',
  },
  {
    id: 'a0s0a8ssbsd',
    name: 'Ogun',
  },
  {
    id: '16hbajsabsd',
    name: 'Calabar',
  },
  {
    id: 'nahs75a5sg',
    name: 'Lagos',
  },
  {
    id: '667atsas',
    name: 'Maiduguri',
  },
  {
    id: 'hsyasajs',
    name: 'Anambra',
  },
  {
    id: 'djsjudksjd',
    name: 'Benue',
  },
  {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  },
  {
    id: 'suudydjsjd',
    name: 'Abuja',
  },
];

export default class MultiSelectExample extends Component {
  state = {
    selectedItems: [],
  };

  // onSelectedItemsChange = (selectedItems) => {
  //   this.setState({selectedItems});
  // };

  render() {
    // const {selectedItems} = this.state;
    const {itemList} = this.props;

    return (
      <View
        style={{
          flex: 1,
          borderColor: '#717171',
          borderWidth: 1,
          borderRadius: 6,
          marginTop: 10,
          width: '100%',
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
          searchInputPlaceholderText="Search..."
          onChangeInput={(text) => console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          textColor="#A8A8A8"
          selectedItemTextColor="#000"
          selectedItemIconColor="#000"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#000', height: 35}}
          styleItemsContainer={{
            borderTopWidth: 0,
            borderColor: '#81a192',
            width: '100%',
            backgroundColor: '#b1d0c7',
          }}
          styleDropdownMenuSubsection={{
            borderBottomWidth: 0,
            backgroundColor: 'transparent',
            paddingLeft: 15,
            paddingBottom: 0,
            paddingRight: 15,
          }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          hideSubmitButton={true}
          hideDropdown={false}
          single={true}
        />
        {/* <View>
         {this.multiSelect.getSelectedItemsExt(selectedItems)}
        </View> */}
      </View>
    );
  }
}
