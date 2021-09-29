import moment from 'moment';
import numeral from 'numeral';
import React, { useState } from 'react';
import {
  Animated,
  Easing, FlatList, LayoutAnimation, Platform, Text,
  TouchableOpacity, UIManager, View
} from 'react-native';
import { height, width } from 'react-native-dimension';
import { Circle } from 'react-native-progress';
import { rightIcon, upIcon } from '../../assets/images';
import AppColors from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { Capitalize } from '../../utills/Methods';
import Button from '../Button';
import styles from './styles';


if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const TimeoffVertical = ({data,load,setModal}) => {
  console.log("TimeoffVertical",load)
  return (
    <FlatList
      columnWrapperStyle={{justifyContent: 'space-between', width: width(90)}}
      data={load}
      nestedScrollEnabled={true}
      numColumns={2}
      ItemSeparatorComponent={() => <View style={CommonStyles.marginTop_3} />}
      keyExtractor={(i) => String(Math.random())}
      contentContainerStyle={styles.flatListVertical}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => <RenderItemVertical 
        fData={item} item={data} 
        setModal={setModal}
      />}
    />
  );
};

const Timeoff = ({data}) => {
  return (
    <FlatList
      data={data}
      nestedScrollEnabled={true}
      horizontal={true}
      ItemSeparatorComponent={() => <View style={styles.margin} />}
      keyExtractor={(i) => String(Math.random())}
      contentContainerStyle={styles.flatList}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => <RenderItem item={item} />}
    />
  );
};

const RenderItem = ({item}) => {
  const spinValue = new Animated.Value(0);

  const [show, setShow] = useState(true);
  const [spin, setSpin] = useState(
    spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    }),
  );
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
  var status = item;
  return (
    <Animated.View activeOpacity={0.8} style={styles.container}>
      <TouchableOpacity onPress={hide} style={styles.row1}>
        <Text style={styles.text}>Travel Leave</Text>
        <Animated.Image
          resizeMode="contain"
          source={upIcon}
          style={[styles.icon, {transform: [{rotate: spin}]}]}
        />
      </TouchableOpacity>
      {show ? (
        <>
          <Text style={styles.text1}>Holiday</Text>
          <View style={{width: width(30), height: width(30)}}>
            <Circle
              borderWidth={0}
              thickness={width(3)}
              color={AppColors.green}
              size={width(30)}
              key={Math.random()}
              unfilledColor={AppColors.gray1}
              progress={status == 'active' ? 0.5 : 0}
            />
            <View style={styles.absolute}>
              {status == 'active' ? (
                <>
                  <Text style={styles.count}>3</Text>
                  <View style={styles.line1} />
                  <Text style={styles.count1}>5</Text>
                  <Text style={styles.count2}>Days</Text>
                </>
              ) : status == 'balance' ? (
                <>
                  <Text style={[styles.count, {color: AppColors.black1}]}>
                    50
                  </Text>
                  <Text style={[styles.count2, {color: AppColors.black1}]}>
                    Days
                  </Text>
                  <Button
                    title="Paid"
                    textStyle={styles.buttonText}
                    containerStyle={styles.button}
                  />
                </>
              ) : (
                <>
                  <Text style={[styles.count, {color: AppColors.black1}]}>
                    11
                  </Text>
                  <Text style={[styles.count2, {color: AppColors.black1}]}>
                    Days
                  </Text>
                </>
              )}
            </View>
          </View>
          {status == 'request' && (
            <>
              <View style={[styles.line, {marginTop: height(2)}]} />
              <View style={[styles.row1, {width: '100%'}]}>
                <View>
                  <Text style={styles.date1}>Start date</Text>
                  <Text style={styles.date}>02/Jun/21</Text>
                </View>
                <View style={styles.line2} />
                <View>
                  <Text style={styles.date1}>End date</Text>
                  <Text style={styles.date}>13/Jul/21</Text>
                </View>
              </View>
            </>
          )}
          <View style={[styles.line, {marginTop: height(2)}]} />
          <TouchableOpacity activeOpacity={0.8}>
            {status == 'active' ? (
              <Text style={styles.endText}>End Leave</Text>
            ) : status == 'balance' ? (
              <Text style={[styles.endText, {color: AppColors.green}]}>
                Request
              </Text>
            ) : (
              <Text style={styles.endText}>Cancel Request</Text>
            )}
          </TouchableOpacity>
        </>
      ) : null}
    </Animated.View>
  );
};

const RenderItemVertical = ({item,fData,setModal}) => {
  const spinValue = new Animated.Value(0);

  const [show, setShow] = useState(true);
  const [spin, setSpin] = useState(
    spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
    }),
  );
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
        animate(['0deg', '90deg']);
      } else {
        animate(['90deg', '0deg']);
      }
      return !show;
    });
  };
  var status = item;
  return (
    <Animated.View activeOpacity={0.8} style={styles.container}>
      <TouchableOpacity onPress={hide} style={styles.row1}>
        <Text style={styles.text} numberOfLines={1}>
          {fData && fData.timeoff && fData.timeoff.title ? Capitalize(fData.timeoff.title)
           : fData && fData.title ? Capitalize(fData.title) : ""
          }
        </Text>
        <Animated.Image
          resizeMode="contain"
          source={rightIcon}
          style={[styles.icon, {transform: [{rotate: spin}]}]}
        />
      </TouchableOpacity>
      {show ? (
        <>
          <Text style={styles.text1}>
            {
              fData && fData.timeoff && fData.timeoff.category ? Capitalize(fData.timeoff.category) : 
                fData && fData.category ? Capitalize(fData.category) : "" 
            }
          </Text>
          <View style={{width: width(30), height: width(30)}}>
            <Circle
              borderWidth={0}
              thickness={width(3)}
              color={AppColors.green}
              size={width(30)}
              key={Math.random()}
              unfilledColor={AppColors.gray1}
              progress={
                fData && fData.days_taken &&
                fData.days_requested ? numeral(fData.days_taken/fData.days_requested).format("0.00") : 0
              }
              direction='counter-clockwise'
            />
            <View style={styles.absolute}>
              {status == 'active' ? (
                <>
                  <Text style={styles.count}>{fData && fData.days_taken ? fData.days_taken : ""}</Text>
                  <View style={styles.line1} />
                  <Text style={styles.count1}>{fData && fData.days_requested ? fData.days_requested : ""}</Text>
                  <Text style={styles.count2}>Days</Text>
                </>
              ) : status == 'balance' ? (
                <>
                  <Text style={[styles.count, {color: AppColors.black1}]}>
                    {fData && fData.max_days_allowed ? fData.max_days_allowed : 0}
                  </Text>
                  <Text style={[styles.count2, {color: AppColors.black1}]}>
                    Days
                  </Text>
                  {
                    fData && fData.is_paid ? (
                      <Button
                        title="Paid"
                        textStyle={styles.buttonText}
                        containerStyle={styles.button}
                      />
                    ) : null
                  }
                </>
              ) : status == 'fewDays' ? (
                <>
                  <Text style={[styles.text, {color: AppColors.green}]}>
                    {fData && fData.timeoff && fData.timeoff.max_days_allowed ? fData.timeoff.max_days_allowed : 0} Days
                  </Text>
                  <Text style={[styles.text2, {color: AppColors.green}]}>
                    Available
                  </Text>
                  <View style={styles.line3} />
                  <Text style={[styles.text, {color: AppColors.black2}]}>
                    {fData && fData.days_taken? fData.days_taken : 0} Days
                  </Text>
                  <Text style={[styles.text2, {color: AppColors.black2}]}>
                    Taken
                  </Text>
                </>
              ) : (
                <>
                  <Text style={[styles.count, {color: AppColors.black1}]}>
                    {fData && fData.days_requested ? fData.days_requested : 0}
                  </Text>
                  <Text style={[styles.count2, {color: AppColors.black1}]}>
                    Days
                  </Text>
                  {
                    fData && fData.timeoff && fData.timeoff.is_paid ? (
                      <Button
                        title="Paid"
                        textStyle={styles.buttonText}
                        containerStyle={styles.button}
                      />
                    ) : null
                  }
                </>
              )}
            </View>
          </View>
          {(status == 'request' || status == 'active')  && (
            <>
              <View style={[styles.line, {marginTop: height(2)}]} />
              <View style={[styles.row1, {width: '100%'}]}>
                <View>
                  <Text style={styles.date1}>Start date</Text>
                  <Text style={styles.date}>
                    {fData && fData.start_date ? moment(fData.start_date).format("DD/MMM/YY") : ""}
                  </Text>
                </View>
                <View style={styles.line2} />
                <View>
                  <Text style={styles.date1}>End date</Text>
                  <Text style={styles.date}>
                    {fData && fData.start_date ? moment(fData.end_date).format("DD/MMM/YY") : ""}
                  </Text>
                </View>
              </View>
            </>
          )}
          <View style={[styles.line, {marginTop: height(2)}]} />
          <TouchableOpacity activeOpacity={0.8}
            onPress={()=>{
              if(status === "active"){
                return setModal(fData.id)
              }
              if(status === "request"){
                return 
              }
              //console.log("--||--")
            }}
          >
            {status == 'active' ? (
              <Text style={styles.endText}>End Leave</Text>
            ) : status == 'balance' ? (
              <Text style={[styles.endText, {color: AppColors.green}]}>
                Request
              </Text>
            ) : null}
            {
              status === "request" ? (
                <Text style={styles.endText}>Cancel Request</Text>
              ) : null
            }
          </TouchableOpacity>
        </>
      ) : null}
    </Animated.View>
  );
};

export { TimeoffVertical };
export default Timeoff;
