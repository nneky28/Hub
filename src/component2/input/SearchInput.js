// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import CustomText from '../customText/CustomText';
import CusInput from './inputElement';

const App = (props) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [showListItems, setshowListItems] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       setFilteredDataSource(responseJson);
  //       setMasterDataSource(responseJson);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item, index}) => {
    let listname = item.title || item.name;
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => {
          getItem(item);
          props.onselectItem(item);
          // setshowListItems(false);
        }}>
        {/* {(index += 1)} */}
        {/* {'.'} */}
        {listname.toUpperCase()}
      </Text>
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
    // alert('Id : ' + item.id + ' Title : ' + item.title);
    // setSelectedValue(item.title);
    setshowListItems(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        /> */}
        <CusInput
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          name="search"
          keyboardType={'default'}
          // style={styles.textInputStyle}
          value={props.selectedValue || selectedValue}
          // defaultValue={props.selectedValue || selectedValue}
          onFocus={() => setshowListItems(true)}
          // onBlur={() => setshowListItems(false)}
          autoFocus={props.textFieldAutoFocus || false}
          // {...props.textProps}
        />
        {showListItems === false ? null : (
          <FlatList
            data={props.dataItems}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            // ListEmptyComponent={
            //   <View
            //     style={{
            //       padding: 15,
            //       flex: 1,
            //       justifyContent: 'center',
            //       alignItems: 'center',
            //     }}>
            //     <CustomText
            //       textSize={11}
            //       textWeight={'bold'}
            //       textcolor={'#000000'}
            //       displayText={'No  result found '}
            //       textStyle={{
            //         marginTop: 18,
            //       }}
            //     />
            //   </View>
            // }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

export default App;
