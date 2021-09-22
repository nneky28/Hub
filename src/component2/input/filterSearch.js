import React, {Component} from 'react';
import {Container, Header, Content, Input, Item} from 'native-base';
import {Image as NativeImage} from 'react-native';
import Image from 'react-native';
import Search from '../../assets/images/profile/search.png';
export default class RegularTextboxExample extends Component {
  render() {
    return (
      <Item
        regular
        style={{
          borderRadius: 5,
          flex: 1,
          paddingLeft: 10,
          paddingLeft: 10,
          width: "100%",
        }}>
        <NativeImage source={Search} style={{width: 12, height: 12}} />
        <Input
          placeholder={this.props.placeholderText || "Search for asset type"}
          style={{fontSize: 12}}
          {...this.props}
        />
      </Item>
    );
  }
}
