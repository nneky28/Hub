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
import { Capitalize, getData } from '../../utills/Methods';
import { getAPIs } from '../../utills/api';
import moment from 'moment';
import { Container, H1, ImageWrap, LottieIcon, P, Rounded, SizedBox } from '../../utills/components';
import Birthdayjson from '../../assets/lottie/birthday.json'
import Emptyjson from '../../assets/lottie/birthday-icon.json'
import Outjson from '../../assets/lottie/out.json'
import { useNavigation } from '@react-navigation/core';
import { ColorList } from '../../utills/AppColors';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const TasksList = ({data,whos_out,birthdays,navigate,upcoming_birthdays,anniversary}) => {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={styles.margin} />}
      keyExtractor={(i) => String(Math.random())}
      contentContainerStyle={styles.flatList}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}
      renderItem={({item}) => <RenderItem item={item} birthdays={birthdays}
        whos_out={whos_out}
        upcoming_birthdays={upcoming_birthdays}
        navigate={navigate}
        anniversary={anniversary}
      />}
    />
  );
};
const RenderItem = ({item,whos_out,birthdays,navigate,upcoming_birthdays,anniversary}) => {
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
  const showMore = (title,selected) => {
    //return console.log("showMore",title,selected)
    let tab = title == "Celebrations" ? title : "Who's out"
    return navigate("People",{tab})
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
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
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

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>{title}</Text> */}
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
        {selected == 'Birthdays' ? (
              <React.Fragment>
                {
                  birthdays && Array.isArray(birthdays) && birthdays.length > 0 ? birthdays.map((item,index)=>(
                    <View style={styles.birthdayContainer} key={index}>
                      {
                        item && item.photo ? (
                          <Image source={{uri : item.photo}} style={styles.image} />
                        ) : (
                          <Rounded backgroundColor={ColorList[Math.floor(Math.random()*4)]}>
                            <H1>
                              {item && item.first_name && item.first_name.length > 0 ? Capitalize([...item.first_name][0]) : ""}
                              {item && item.last_name && item.last_name.length > 1 ? `${Capitalize([...item.last_name][0])}` : ""}
                            </H1>
                          </Rounded>
                        )
                      }
                      <View style={{width: '68%'}}>
                        <Text numberOfLines={1} style={styles.text3}>
                          {item && item.first_name ? `${Capitalize(item.first_name)}'s` : ""} birthday is today
                        </Text>
                        {
                          item && item.job && item.job.title ? (
                            <Text numberOfLines={1} style={styles.text1}>
                              {Capitalize(item.job.title)}
                            </Text>
                          ) : null
                        }
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <Image
                          resizeMode="contain"
                          style={styles.icon}
                          source={giftIcon}
                        />
                        <Text numberOfLines={1} style={styles.birthday}>
                          {item && item.birth_date ? moment(item.birth_date).format("MMM DD") : ""}
                        </Text>
                      </View>
                    </View>
                  )) : (
                    <Container 
                      style={{justifyContent : "center", alignItems : "center"}}
                      marginTop={3}
                    >
                        <Container width={50}>
                          <ImageWrap 
                            url={'https://res.cloudinary.com/dgny8sjrg/image/upload/v1638365299/myedge%20mobile/Vector_3_bt64pb.png'}
                            height={3}
                            fit={"contain"}
                          />
                          <SizedBox height={1}/>
                          <P textAlign="center">{`No upcoming birthdays`}</P>
                        </Container>
                    </Container>
                  )
                }
            {
               false ? (
                <React.Fragment>
                  <TouchableOpacity onPress={hide} style={styles.row}>
                    <Text style={styles.upcomming}>Upcoming Birthdays</Text>
                    <Animated.Image
                      resizeMode="contain"
                      source={upIcon}
                      style={[styles.icon1, {transform: [{rotate: spin}]}]}
                    />
                  </TouchableOpacity>
                  <View style={[styles.line, {marginTop: height(0.5)}]} />
                </React.Fragment>
               ) : null
            }
        </React.Fragment>
      ) : null}
      {
        selected === "Job Anniversary" && anniversary && Array.isArray(anniversary) 
        && anniversary.length === 0 ? (
          <Container 
            style={{justifyContent : "center", alignItems : "center"}}
            marginTop={3}
          >
            <Container width={50}>
              <ImageWrap 
                url={'https://res.cloudinary.com/dgny8sjrg/image/upload/v1638365299/myedge%20mobile/Vector_3_bt64pb.png'}
                height={3}
                fit={"contain"}
              />
              <SizedBox height={1}/>
              <P textAlign="center">{`No upcoming anniversaries`}</P>
            </Container>
          </Container>
        ) : null
      }

      {
        item.title === "Who’s Out" && whos_out && Array.isArray(whos_out) && whos_out.length === 0 ? (
          <Container 
            style={{justifyContent : "center", alignItems : "center"}}
            marginTop={3}
          >
              <Container width={50}>
                <ImageWrap 
                  url={'https://res.cloudinary.com/dgny8sjrg/image/upload/v1638362875/myedge%20mobile/Vector_iz1psh.png'}
                  height={3}
                  fit={"contain"}
                />
                <SizedBox height={1}/>
                <P textAlign="center">{`No one is currently on leave`}</P>
              </Container>
          </Container>
        ) : null
      }

      {show ? (
        <>
          <FlatList
            data={selected === "Job Anniversary" && anniversary && Array.isArray(anniversary) ? anniversary : selected !==  "Job Anniversary" && item && item.title !== "Celebrations" && whos_out && Array.isArray(whos_out) ?
            whos_out : 
            selected !==  "Job Anniversary" && item && item.title !== "Who’s Out" && upcoming_birthdays && Array. isArray(upcoming_birthdays) ? upcoming_birthdays : []
            }
            numColumns={2}
            style={styles.margin1}
            keyExtractor={(item) => String(Math.random())}
            columnWrapperStyle={styles.column}
            ItemSeparatorComponent={() => <View style={styles.margin} />}
            renderItem={({item}) => {
              return (
                <View style={whos_out && Array.isArray(whos_out) && whos_out.length === 1 ?  styles.userContainer2 : styles.userContainer}>
                  {
                    item && item.employee && item.employee.photo ? (
                      <Image source={item.employee.photo} style={styles.image} />
                    ) : (
                      <Rounded backgroundColor={ColorList[Math.floor(Math.random()*4)]}
                        size={10}
                      >
                           <H1>
                          {item && item.employee && item.employee.first_name && item.employee.first_name.length > 0 ? 
                            Capitalize([...item.employee.first_name][0]) : ""}
                          {item && item.employee && item.employee.last_name && item.employee.last_name.length > 1 ? 
                          `${Capitalize([...item.employee.last_name][0])}` : ""}
                        </H1>
                      </Rounded>
                    )
                  }
                  <View style={styles.details}>
                    {
                      selected !== "Birthdays" && selected !== "Job Anniversary" ? (
                        <React.Fragment>
                          <Text numberOfLines={1} style={styles.text3}>
                              {item && item.employee && item.employee.first_name ? Capitalize(item.employee.first_name) : ""}
                              {" "}
                              {item && item.employee && item.employee.last_name ? Capitalize(item.employee.last_name) : ""}
                            </Text>
                            <Text numberOfLines={1} style={styles.text1}>
                            {
                              item && item.employee && item.employee.job && item.employee.job.title ? 
                              Capitalize(item.employee.job.title) : null  
                            }
                          </Text>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <Text numberOfLines={1} style={styles.text3}>
                              {item && item.first_name ? Capitalize(item.first_name) : ""}
                            </Text>
                            <Text numberOfLines={1} style={styles.text1}>
                            {item && item.job && item.job.title ? Capitalize(item.job.title) : ""}
                          </Text>
                        </React.Fragment>
                      )
                    }
                    {selected == 'Birthdays' || selected === "Job Anniversary" ? (
                      <Text numberOfLines={1} style={styles.text1}>
                        { selected == 'Birthdays' && item && item.birth_date ? moment(item.birth_date).format("MMM DD") : selected != 'Birthdays' && item && item.hire_date ? moment(item.hire_date).format("MMM DD") :  ""}
                      </Text>
                    ) : (
                      <React.Fragment>
                        {
                          item && item.title ? (
                            <Button
                              title={item.title}
                              textStyle={styles.buttonText}
                              containerStyle={styles.button}
                            />
                          ) : null
                        }
                      </React.Fragment>
                    )}
                  </View>
                </View>
              );
            }}
          />
          {
            (item.title === "Who’s Out" && whos_out && Array.isArray(whos_out) && whos_out.length > 0) 
          || (selected === "Job Anniversary" && anniversary && Array.isArray(anniversary) 
          && anniversary.length > 0) || 
          (
            selected == 'Birthdays' && birthdays && Array.isArray(birthdays) && birthdays.length > 0
          )
          ? (
            <TouchableOpacity activeOpacity={0.8} onPress={()=>showMore(item.title,selected)}>
              <Text style={styles.viewAll}>View all </Text>
            </TouchableOpacity>
          ) : 
            null
          }
          {/* (
            <TouchableOpacity activeOpacity={0.8} onPress={showLess}>
              <Text style={styles.viewAll}>View less </Text>
            </TouchableOpacity>
          ) */}
        </>
      ) : null}
    </View>
  );
};
export default TasksList;
