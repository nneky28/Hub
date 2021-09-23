import React, {useEffect, useState} from 'react';
import {
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  LayoutAnimation,
  UIManager,
  Platform,
  ScrollView,
} from 'react-native';
import Button from '../Button';
import {giftIcon, placeholderIcon, upIcon} from '../../assets/images';
import styles from './styles';
import {height} from 'react-native-dimension';
import { getData } from '../../utills/Methods';
import { getAPIs } from '../../utills/api';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const TasksList = ({data}) => {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={styles.margin} />}
      keyExtractor={(i) => String(Math.random())}
      contentContainerStyle={styles.flatList}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}
      renderItem={({item}) => <RenderItem item={item} />}
    />
  );
};
const RenderItem = ({item}) => {
  var {title, headings} = item;
  const [arr, setArr] = useState(['', '', '', '']);
  var [selected, setSelected] = useState(headings[0]);
  const [hasMore, setHasMore] = useState(true);
  const spinValue = new Animated.Value(0);

  const [show, setShow] = useState(true);
  const [spin, setSpin] = useState(
    spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    }),
  );
  const showMore = () => {
    setArr((a) => [...a, '', '', '', '']);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setHasMore(false);
  };

  const showLess = () => {
    setArr((a) => a.splice(4, a.length));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setHasMore(true);
  };
  const onSelection = (item) => {
    // if (selected == 'Birthdays' || item == 'Birthdays') {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    // }
    setShow(true);
    setSelected(item);
  };
  const animate = (deg) => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }).start();
    setSpin(
      spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: deg,
      }),
    );
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  };
  const hide = () => {
    setShow((show) => {
      if (show) {
        animate(['0deg', '180deg']);
      } else {
        animate(['180deg', '0deg']);
      }
      return !show;
    });
  };


  const getTasks = async () => {
    try{
      setLoading(true);
      let token = await getData("token");
      let user =  await getData("user");
      let about_me = await getData("about_me")
      let biz_id = user.employee_user_memberships &&
      Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
      && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0].business_id : null;
      let whos_out_url = APIFunction.whos_out(biz_id,about_me.id)
      let birthdays_url = APIFunction.whos_out(biz_id);
      let whos_out_res = await getAPIs(whos_out_url,token)
      let birthdays_res = await getAPIs(birthdays_url,token);
      console.log("whos_out_res",whos_out_res,birthdays_res)
      setLoading(false);
    }catch(err){
      console.log("err|||",err)
      ToastError("Something went wrong. Please retry")
    }

  }
  useEffect(()=>{
    //getTasks()
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{paddingTop: height(2)}}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        {headings.map((item) => (
          <TouchableOpacity onPress={(e) => onSelection(item)}>
            <Text style={styles.heading}>{item}</Text>
            {selected == item && <View style={styles.animated} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.line} />
      {selected == 'Birthdays' && (
        <>
          <View style={styles.birthdayContainer}>
            <Image source={placeholderIcon} style={styles.image} />
            <View style={{width: '68%'}}>
              <Text numberOfLines={1} style={styles.text3}>
                Naomi’s birthday is today
              </Text>
              <Text numberOfLines={1} style={styles.text1}>
                Lead Designer
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                style={styles.icon}
                source={giftIcon}
              />
              <Text numberOfLines={1} style={styles.birthday}>
                Jan 23
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={hide} style={styles.row}>
            <Text style={styles.upcomming}>Upcoming Birthdays</Text>
            <Animated.Image
              resizeMode="contain"
              source={upIcon}
              style={[styles.icon1, {transform: [{rotate: spin}]}]}
            />
          </TouchableOpacity>
          <View style={[styles.line, {marginTop: height(0.5)}]} />
        </>
      )}
      {show ? (
        <>
          <FlatList
            data={arr}
            numColumns={2}
            style={styles.margin1}
            keyExtractor={(item) => String(Math.random())}
            columnWrapperStyle={styles.column}
            ItemSeparatorComponent={() => <View style={styles.margin} />}
            renderItem={({item}) => {
              return (
                <View style={styles.userContainer}>
                  <Image source={placeholderIcon} style={styles.image} />
                  <View style={styles.details}>
                    <Text numberOfLines={1} style={styles.text3}>
                      Aderinsola Derin
                    </Text>
                    <Text numberOfLines={1} style={styles.text1}>
                      Lead Designer
                    </Text>

                    {selected == 'Birthdays' ? (
                      <Text numberOfLines={1} style={styles.text1}>
                        Jan 14
                      </Text>
                    ) : (
                      <Button
                        title="Sick Leave"
                        textStyle={styles.buttonText}
                        containerStyle={styles.button}
                      />
                    )}
                  </View>
                </View>
              );
            }}
          />
          {hasMore? (
            <TouchableOpacity activeOpacity={0.8} onPress={showMore}>
              <Text style={styles.viewAll}>View all </Text>
            </TouchableOpacity>
          ) : 
          (
            <TouchableOpacity activeOpacity={0.8} onPress={showLess}>
              <Text style={styles.viewAll}>View less </Text>
            </TouchableOpacity>
          )
          }
        </>
      ) : null}
    </View>
  );
};
export default TasksList;
