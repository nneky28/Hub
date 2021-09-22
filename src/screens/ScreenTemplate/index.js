// Scroll to the Top or Bottom of the ListView in React Native
// https://aboutreact.com/react-native-scroll-up-or-down-the-listview-on-the-click-of-button/

// import React in our code
import React, { useState } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const ScreenTemplate = () => {
  let listViewRef;
  const [dataSource, setDataSource] = useState([
    { id: 1, title: 'Button' },
    { id: 2, title: 'Card' },
    { id: 3, title: 'Input' },
    { id: 4, title: 'Avatar' },
    { id: 5, title: 'CheckBox' },
    { id: 6, title: 'Header' },
    { id: 7, title: 'Icon' },
    { id: 8, title: 'Lists' },
    { id: 9, title: 'Rating' },
    { id: 10, title: 'Pricing' },
    { id: 11, title: 'Avatar' },
    { id: 12, title: 'CheckBox' },
    { id: 13, title: 'Header' },
    { id: 14, title: 'Icon' },
    { id: 15, title: 'Lists' },
    { id: 16, title: 'Rating' },
    { id: 17, title: 'Pricing' },
  ]);

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity onPress={() => scrollToIndex(4)}>
          <Text style={styles.itemStyle}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  const upButtonHandler = () => {
    //OnCLick of Up button we scrolled the list to top
    listViewRef.scrollToOffset({ offset: 0, animated: true });
  };

  const downButtonHandler = () => {
    //OnCLick of down button we scrolled the list to bottom
    listViewRef.scrollToEnd({ animated: true });
  };

  const scrollToIndex= (index) => {
    listViewRef.scrollToIndex({ animated: true, index: index });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ref={(ref) => {
          listViewRef = ref;
        }}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={downButtonHandler}
        style={styles.downButtonStyle}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/arrow_down.png',
          }}
          style={styles.downButtonImageStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => scrollToIndex(4)}
        style={styles.upButtonStyle}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/arrow_down.png',
          }}
          style={styles.downButtonImageStyle}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    padding: 30,
    fontSize: 20,
  },
  upButtonStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 70,
  },
  upButtonImageStyle: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  downButtonStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    top: 70,
  },
  downButtonImageStyle: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
});

export default ScreenTemplate;
