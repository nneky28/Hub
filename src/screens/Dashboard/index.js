import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { Container, SizedBox, TouchableWrapper, P, EmptyStateWrapper, useDebounce } from '../../utills/components';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBox, { SearchBoxIOS } from '../../components/SearchBox';
import { width } from 'react-native-dimension';
import ItemList from '../../components/ItemList';
import { filterIcon } from '../../assets/images';
import { itemList } from '../../utills/dummydata'
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../../utills/Methods';

const index = ({ navigation, route }) => {
  const { liked } = route.params ?? {};
  const menu = ['All', 'Men', 'Women', 'Kids'];
  const rawdata = useAppSelector((state) => state.Config.isItemVisible);
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  const [search, setSearch] = useState('');
  const searchTerm = useDebounce(search, 200);
  const [selectedText, setSelectedText] = useState([]);

  const data = rawdata.filter(item => item.title.startsWith(search))

  const savedItems = data.filter((el) => {
    return el.favourite === true
  }
  )

  const setButtons = (i) => {
    setCurrentTabIndex(i);
  };



  const handleSearch = (text) => {
    setSearch(text);

  };

  const KeyExtractor = (item, index) =>
    `${item}${index}`.toString();

  const RenderItem = ({ item }) => {
    return (
      <View>
        <ItemList item={item} onPressHandler={() => navigation.navigate("Details", { id: item.id })} />
      </View>
    )
  }
  const ListEmptyComponent = () => {
    return (
      <EmptyStateWrapper
        header_1={'No saved item'}
        sub_text={'When you do, they will show up here.'}
      />
    );
  };

  return (
    <ScreenWrapper scrollEnabled={true}>
      <View style={styles.mainCon}>
        <Container>
          <View style={styles.header}>
            <View style={styles.row}>
              <TouchableOpacity>
                <Text numberOfLines={1} style={styles.text1}>
                  Discover
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <TouchableWrapper>
                <Ionicons name={'notifications-outline'} size={width(6)} />
              </TouchableWrapper>
            </TouchableOpacity>
          </View>
        </Container>
        <SizedBox height={1} />
        {Platform.OS === 'android' ? (
          <View style={styles.searchBoxContainer}>
            <SearchBox
              title="Search anything"
              onChangeText={setSearch}
              containerStyle={styles.searchBoxStyle}
              onSubmitEditing={handleSearch}
              value={search}
            />
            <Container>
              <TouchableOpacity style={styles.filterIcon} onPress={handleSearch}>
                <Image
                  resizeMode="contain"
                  source={filterIcon}
                  style={styles.filterIcons}
                />
              </TouchableOpacity>
            </Container>
          </View>
        ) : (
          <View style={styles.searchBoxContainer}>
            <SearchBoxIOS
              title="Search anything"
              onChangeText={setSearch}
              containerStyle={styles.searchBoxStyle}
              onSubmitEditing={handleSearch}
              value={search}
            />
            <Container style={styles.filterIcon}>
              <TouchableOpacity style={styles.filterIconContainerIOS}>
                <Image
                  resizeMode="contain"
                  source={filterIcon}
                  style={styles.filterIcons}
                />
              </TouchableOpacity>
            </Container>
          </View>
        )}

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            width: width(95),
          }}
          style={styles.threeButtonCont}>
          {menu.map((item, i) => (
            <TouchableWrapper
              onPress={() => {
                setButtons(i);
              }}
              style={
                currentTabIndex === i ? styles.animatedView : styles.button
              }
              key={i}>
              <Text
                style={[
                  styles.buttonText,
                  currentTabIndex === i && styles.buttonText1,
                ]}>
                {item}
              </Text>
            </TouchableWrapper>
          ))}
        </ScrollView>


        <FlatList
          data={liked ? savedItems : data}
          keyExtractor={KeyExtractor}
          renderItem={RenderItem}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReachedThreshold={0.1}
          numColumns={2}
          columnWrapperStyle={styles.rowFlat}
          ListEmptyComponent={ListEmptyComponent}
        />

      </View>
    </ScreenWrapper>
  );
};

export default index;
