import moment from 'moment';
import numeral from 'numeral';
import React, { useState } from 'react';
import {
  Animated,
  FlatList, Platform, Text,
  TouchableOpacity, UIManager, View
} from 'react-native';
import { height, width } from 'react-native-dimension';
import { Circle } from 'react-native-progress';
import AppColors from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { Container, EmptyStateWrapper, P, TouchableWrapper } from '../../utills/components';
import { Capitalize } from '../../utills/Methods';
import styles from './styles';
import { Images } from '../../utills/Image';
import { FontFamily } from '../../utills/FontFamily';
import { RenderItemVerticalProps, TimeOffHorizontalProps, TimeoffVerticalProps } from './types';
import { useFetchEmployeeTimeOffData, useFetchEmployeeTimeOffReqsData, useFetchEmployeeTimeOffTakenData } from '../../screens/Dashboard/types';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const TimeoffVertical = ({data,load,onItemPress,header_1,header_2} : TimeoffVerticalProps) => {

  const RenderItem = ({item} : {item : useFetchEmployeeTimeOffData | useFetchEmployeeTimeOffReqsData | useFetchEmployeeTimeOffTakenData}) => <RenderItemVertical 
  fData={item} status={data} 
  onItemPress={onItemPress}
/>

  const KeyExtractor = (item : useFetchEmployeeTimeOffData | useFetchEmployeeTimeOffReqsData | useFetchEmployeeTimeOffTakenData, i: number) => `${item}${i}`.toString()

  return (
    <React.Fragment>
      {
        load && Array.isArray(load) && load.length > 0 ? (
          <FlatList
            columnWrapperStyle={{justifyContent: 'space-between', width: width(90)}}
            data={load}
            nestedScrollEnabled={true}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={CommonStyles.marginTop_3} />}
            keyExtractor={KeyExtractor}
            contentContainerStyle={styles.flatListVertical}
            showsHorizontalScrollIndicator={false}
            renderItem={RenderItem}
          />
        ) : (
          <EmptyStateWrapper 
            icon={Images.EmptyTimeoff}
            header_1={header_1} 
            header_2={header_2}
            sub_text={"When there is, they will show up here."}
        />
        )
      }
    </React.Fragment>
  );
};

const Timeoff = (props : TimeOffHorizontalProps) => {
  const RenderComponent = ({item}: {item : useFetchEmployeeTimeOffData | useFetchEmployeeTimeOffReqsData | useFetchEmployeeTimeOffTakenData}) => <RenderItemVertical 
    fData={item} 
    status={props?.data} 
    onItemPress={props?.onItemPress}
/>
  const KeyExtractor = (item : useFetchEmployeeTimeOffData | useFetchEmployeeTimeOffReqsData | useFetchEmployeeTimeOffTakenData,i : number) => `${item}${i}`.toString()
  return (
    <React.Fragment>
        {
          props?.load && Array.isArray(props?.load) && props?.load?.length > 0 ? (
            <FlatList
              data={props?.load}
              nestedScrollEnabled={true}
              horizontal={true}
              ItemSeparatorComponent={() => <View style={styles.margin} />}
              keyExtractor={KeyExtractor}
              contentContainerStyle={styles.flatList}
              showsHorizontalScrollIndicator={false}
              renderItem={RenderComponent}
            />
          ) : (
            <Container style={{justifyContent : "center", alignItems : "center"}}>
                <EmptyStateWrapper 
                  icon={Images.EmptyTimeoff}
                  height={18}
                  marginTop={1}
                  header_1={"Oops!"}
                  sub_text={`You do not have any ${props?.data === "request" ? "request" : props?.data+" timeoff"}`}
                />
            </Container>
          )
        }
    </React.Fragment>
  );
};

// const RenderItem = (props : RenderItemHorizontalProps) => {
//   const [show] = useState(true);
//   const {status} = props
//   return (
//     <Animated.View  style={styles.container}>
//       <TouchableOpacity 
//         //onPress={hide} 
//         style={styles.row1}
//       >
//         <Text style={styles.text} numberOfLines={1}>{status === "balance" && props?.fData?.title ? Capitalize(props?.fData?.title) : status !== "balance" && props?.fData?.timeoff?.title ? Capitalize(props?.fData?.timeoff?.title) : ""}</Text>
//         {/* <Animated.Image
//           resizeMode="contain"
//           source={upIcon}
//           style={[styles.icon, {transform: [{rotate: spin}]}]}
//         /> */}
//       </TouchableOpacity>
//       {show ? (
//         <>
//           <Text style={styles.text1}>{item?.is_paid ? "Paid" : item?.timeoff?.is_paid ? "Paid" : "Unpaid"}</Text>
//           {/* {
//                     item && item.is_paid ? (
//                       <Button
//                         title="Paid"
//                         textStyle={styles.buttonText}
//                         containerStyle={styles.button}
//                       />
//                     ) : null
//                   } */}
//           <View style={{width: width(35), height: width(35)}}>
//             <Circle
//               borderWidth={0}
//               thickness={width(4)}
//               color={AppColors.gray1}
//               size={width(35)}
//               key={Math.random()}
//               unfilledColor={AppColors.lightMediumGreen}
//               progress={
//                 status == 'active' && item && item.days_taken && item.days_requested ? 
//                 Number(numeral(item.days_taken/item.days_requested).format("0.00")) : status === "balance" && item.total_days_taken ?  
//                 Number(numeral(item.total_days_taken/item.max_days_allowed).format("0.00")) : 0
//               }
//             />
//             <View style={styles.absolute}>
//               {status == 'active' ? (
//                 <>
//                   <Text style={styles.count}>{item && item.days_taken ? item.days_taken : 0}</Text>
//                   <View style={styles.line1} />
//                   <Text style={styles.count1}>{item && item.days_requested ? item.days_requested : 0}</Text>
//                   <Text style={styles.count2}>{item?.days_requested > 1 ? 'Days' : 'Day'}</Text>
//                 </>
//               ) : status == 'balance' ? (
//                 <>
//                 {
//                   item && item.max_days_allowed && item.total_days_taken > 0 ? (
//                     <>
//                       <Text style={styles.count1}>{item && item.total_days_taken ?  item.total_days_taken : 0} {item.total_days_taken > 1 ? 'Days' : 'Day' }</Text>
//                       <P color={AppColors.grayBorder} fontSize={3.1}>Taken</P>
//                       <View style={styles.line1} />
//                       <Text style={[styles.count,{color :  (Number(item.max_days_allowed) - Number(item.total_days_taken)) == 0 ? AppColors.grayBorder : AppColors.lightMediumGreen}]}>{item.max_days_allowed - item.total_days_taken} {(item.max_days_allowed - item.total_days_taken) > 1 ? 'Days' : 'Day'}</Text>
//                       <Text style={
//                         [styles.count,
//                           {fontSize : width(3)},
//                           {color :  (Number(item.max_days_allowed) - Number(item.total_days_taken)) == 0 ? AppColors.grayBorder : AppColors.lightMediumGreen}
//                         ]
//                       }>Available</Text>
//                     </>
//                   ) : null
//                 }
//                 {
//                   item && item.total_days_taken === 0 ? (
//                     <>
//                       <Text style={[styles.count, {color: AppColors.lightMediumGreen}]}>
//                         {item && item.max_days_allowed ? item.max_days_allowed : 0} {item && item.max_days_allowed && item.max_days_allowed > 1 ? `Days` : "Day"}
//                       </Text>
//                       <Text style={
//                         [styles.count,
//                           {fontSize : width(3)},
//                           {color :  (Number(item.max_days_allowed) - Number(item.total_days_taken)) == 0 ? AppColors.grayBorder : AppColors.lightMediumGreen}
//                         ]
//                       }>Available</Text>
//                       {/* <Text style={[styles.count2, {color: AppColors.black1}]}>
//                         Days
//                       </Text> */}
//                     </>
//                   ) : null
//                 }
//                 </>
//               ) : (
//                 <>
//                   <Text style={[styles.count, {color: AppColors.black1}]}>
//                     {item && item.days_requested ? item.days_requested : 0} {item?.days_requested > 1 ? `Days` : "Day"}
//                   </Text>
//                   {/* <Text style={[styles.count2, {color: AppColors.black1}]}>
//                     Days
//                   </Text> */}
//                 </>
//               )}
//             </View>
//           </View>
//           {status == 'request' || status== "active" ? (
//             <>
//               <View style={[styles.line, {marginTop: height(2)}]} />
//               <View style={[styles.row1, {width: '100%'}]}>
//                 <View>
//                   <Text style={styles.date1}>Start date</Text>
//                   <Text style={styles.date}>
//                     {item && item.start_date ? moment(item.start_date).format("DD/MMM/YY")  : null}
//                   </Text>
//                 </View>
//                 <View style={styles.line2} />
//                 <View>
//                   <Text style={styles.date1}>End date</Text>
//                   <Text style={styles.date}>
//                     {item && item.end_date ? moment(item.end_date).format("DD/MMM/YY")  : null}
//                   </Text>
//                 </View>
//               </View>
//             </>
//           ) : null}
//           <View style={[styles.line, {marginTop: height(2)}]} />
//           <TouchWrap
//             onPress={()=>{
//               if(status === "balance"){
//                 return showModal(item.id,item)
//               }
//               if(status === "request") return showModal(item.id,item,"request")
//             }}
//             width={30}
//             height={3}
//           >
//             <React.Fragment>
//             {status == 'active' ? (
//               <Text style={styles.endText}>
//               {/* End Leave */}
//               </Text>
//             ) : status == 'balance' && item && item.max_days_allowed && 
//             item.total_days_taken !== undefined && item.max_days_allowed > item.total_days_taken ? (
//               <Text style={[styles.endText, {color: AppColors.lightMediumGreen},{fontFamily : FontFamily.BlackSansSemiBold}]}>
//                 Request
//               </Text>
//             ) : status == 'balance' ? <React.Fragment>
//                 <Text style={{
//                   color : AppColors.gray1,
//                   fontFamily : FontFamily.BlackSansSemiBold
//                 }}>Request</Text>
//               </React.Fragment> : null
//             }
//             {
//               status === "request" ? (
//                 <Text style={styles.endText}>Cancel Request</Text>
//               ) : null
//             }
//             </React.Fragment>
//           </TouchWrap>
//         </>
//       ) : null}
//     </Animated.View>
//   );
// };

const RenderItemVertical = (props : RenderItemVerticalProps) => {
  const {status} = props
  const [show] = useState(true);
  return (
    <Animated.View 
    style={styles.container}
  >
      <TouchableOpacity 
      disabled={true}
      style={styles.row1}>
         <Text style={styles.text} numberOfLines={1}>
          {status !== "balance" && props?.fData?.timeoff?.title ? Capitalize(props?.fData.timeoff?.title)
            : status === "balance" && props?.fData?.title ? Capitalize(props?.fData?.title) : ""
          }
        </Text>
        {/* <Animated.Image
          resizeMode="contain"
          source={rightIcon}
          style={[styles.icon, {transform: [{rotate: spin}]}]}
        /> */}
      </TouchableOpacity>
      {show ? (
        <>
          {/* <Text style={styles.text1}>
            {
              fData && fData.timeoff && fData.timeoff.category ? Capitalize(fData.timeoff.category) : 
                fData && fData.category ? Capitalize(fData.category) : "" 
            }
          </Text> */}
           <Text style={styles.text1}>{(status === "balance" && props?.fData?.is_paid) || (status !== "balance" && props?.fData?.timeoff?.is_paid) ? "Paid" : "Unpaid"}</Text>
          <View style={{width: width(35), height: width(35)}}>
            <Circle
              borderWidth={0}
              thickness={width(4)}
              color={AppColors.gray1}
              size={width(35)}
              key={Math.random()}
              unfilledColor={AppColors.lightMediumGreen}
              progress={
                ((status === "fewDays" || status === "active") && props?.fData?.days_taken) &&
                props?.fData.days_requested ? Number(numeral(props?.fData.days_taken/props?.fData.days_requested).format("0.00")) : status === "balance" && props?.fData?.total_days_taken && props?.fData?.max_days_allowed && props?.fData?.total_days_taken > 0 ?
                Number(numeral(props?.fData?.total_days_taken/props?.fData?.max_days_allowed).format("0.00")) : 0
              }
              //direction='counter-clockwise'
            />
            <View style={styles.absolute}>
              {status == 'active' ? (
                <>
                  <Text style={styles.count}>{props?.fData?.days_taken ? props?.fData?.days_taken : "0"}</Text>
                  <View style={styles.line1} />
                  <Text style={styles.count1}>{props?.fData?.days_requested ? props?.fData?.days_requested : "0"}</Text>
                  <Text style={styles.count2}>{props?.fData?.days_requested && props?.fData?.days_requested > 1 ? 'Days' : 'Day'}</Text>
                </>
              ) : status == 'balance' ? (
                <>
                  {
                    props?.fData?.total_days_taken && props?.fData?.total_days_taken > 0 ? (
                    // <>
                    //   <Text style={styles.count}>{fData.total_days_taken}</Text>
                    //   <View style={styles.line1} />
                    //   <Text style={styles.count1}>{fData && fData.max_days_allowed ?  fData.max_days_allowed : 0}</Text>
                    //   <Text style={styles.count2}>Days</Text>
                    // </>
                    <React.Fragment>
                    <>
                      <Text style={styles.count1}>{props?.fData?.total_days_taken ?  props?.fData?.total_days_taken : 0} {props?.fData?.total_days_taken > 1 ? 'Days' : 'Day'}</Text>
                      <P color={AppColors.grayBorder} fontSize={3.1}>Taken</P>
                      <View style={styles.line1} />
                      <Text style={[styles.count,{color :  (Number(props?.fData?.max_days_allowed) - Number(props?.fData?.total_days_taken)) == 0 ? AppColors.grayBorder : AppColors.lightMediumGreen}]}>{(props?.fData?.max_days_allowed || 0) - (props?.fData?.total_days_taken || 0)} {((props?.fData?.max_days_allowed || 0) - (props?.fData?.total_days_taken || 0)) > 1 ? 'Days' : 'Day'}</Text>
                      <Text style={
                        [styles.count,
                          {fontSize : width(3)},
                          {color :  (Number(props?.fData?.max_days_allowed) - Number(props?.fData?.total_days_taken)) == 0 ? AppColors.grayBorder : AppColors.lightMediumGreen}
                        ]
                      }>Available</Text>
                    </>
                  </React.Fragment>
                  ) : null
                }
                  {
                    props?.fData?.total_days_taken !== undefined && props?.fData?.total_days_taken === 0 ? (
                      <>
                      <Text style={[styles.count, {color: AppColors.lightMediumGreen}]}>
                        {props?.fData?.max_days_allowed ? props?.fData?.max_days_allowed : 0} {props?.fData.max_days_allowed && props?.fData?.max_days_allowed > 1 ? `Days` : "Day"}
                      </Text>
                      <Text style={
                        [styles.count,
                          {fontSize : width(3)},
                          {color :  (Number(props?.fData?.max_days_allowed) - Number(props?.fData?.total_days_taken)) == 0 ? AppColors.grayBorder : AppColors.lightMediumGreen}
                        ]
                      }>Available</Text>
                      {/* <Text style={[styles.count2, {color: AppColors.black1}]}>
                        Days
                      </Text> */}
                    </>
                    ) : null
                  }
                </>
              ) : status == 'fewDays' ? (
                <>
                  {/* <Text style={[styles.text, {color: AppColors.green}]}>
                    {fData && fData.timeoff && fData.timeoff.max_days_allowed ? fData.timeoff.max_days_allowed : 0} Days
                  </Text>
                  <Text style={[styles.text2, {color: AppColors.green}]}>
                    Available
                  </Text>
                  <View style={styles.line3} /> */}
                  <Text style={[styles.text, {color: AppColors.black2}]}>
                    {props?.fData?.days_taken ? props?.fData?.days_taken : 0} {props?.fData?.days_taken && props?.fData?.days_taken > 1 ? "Days" : "Day"}
                  </Text>
                  <Text style={[styles.text2, {color: AppColors.black2}]}>
                    Taken
                  </Text>
                </>
              ) : (
                <>
                  {/* <Text style={[styles.count, {color: AppColors.black1}]}>
                    {fData && fData.days_requested ? fData.days_requested : 0}
                  </Text> */}

                  <Text style={[styles.count, {color: AppColors.black1}]}>
                    {props?.fData?.days_requested ? props?.fData?.days_requested : 0} {props?.fData?.days_requested && props?.fData?.days_requested > 1 ? `Days` : "Day"}
                  </Text>

                  {/* <Text style={[styles.count2, {color: AppColors.black1}]}>
                    Days
                  </Text> */}
                  {/* {
                    fData && fData.timeoff && fData.timeoff.is_paid ? (
                      <Button
                        title="Paid"
                        textStyle={styles.buttonText}
                        containerStyle={styles.button}
                      />
                    ) : null
                  } */}
                </>
              )}
            </View>
          </View>
          {(status == 'request' || status == 'active' || status == "fewDays")  && (
            <>
              <View style={[styles.line, {marginTop: height(2)}]} />
              <View style={[styles.row1, {width: '100%'}]}>
                <View>
                  <Text style={styles.date1}>Start date</Text>
                  <Text style={styles.date}>
                    {props?.fData?.start_date ? moment(props?.fData?.start_date).format("DD/MMM/YY")  : null}
                  </Text>
                </View>
                <View style={styles.line2} />
                <View>
                  <Text style={styles.date1}>End date</Text>
                  <Text style={styles.date}>
                    {props?.fData?.end_date ? moment(props?.fData?.end_date).format("DD/MMM/YY")  : null}
                  </Text>
                </View>
              </View>
            </>
          )}
          <View style={[styles.line, {marginTop: height(2)}]} />
          <TouchableWrapper
            disabled={!props?.onItemPress || !["request","balance"].includes(status)}
            onPress={()=>{
              if(!props?.onItemPress || !["request","balance"].includes(status)) return
              props?.onItemPress({item:props?.fData,status})
            }}
            width={30}
            height={3}
            isText
          >
              <React.Fragment>
                {status == 'active' ? (
                  <Text style={styles.endText}>
                    {/* End Leave */}
                  </Text>
                ) : status == 'balance' && props?.fData?.max_days_allowed && props?.fData?.total_days_taken !== undefined && props?.fData?.max_days_allowed > props?.fData.total_days_taken  ? (
                  <Text style={[styles.endText, {color: AppColors.lightMediumGreen},{fontFamily : FontFamily.BlackSansSemiBold}]}>
                    Request
                  </Text>
                ) : status == 'balance' ? <React.Fragment>
                    <Text style={{
                      color : AppColors.gray1,
                      fontFamily : FontFamily.BlackSansSemiBold
                    }}>Request</Text>
                  </React.Fragment> : null
                }
                {
                  status === "request" ? (
                    <Text style={styles.endText}>Cancel Request</Text>
                  ) : null
                }
              </React.Fragment>
          </TouchableWrapper>
        </>
      ) : null}
    </Animated.View>
  );
};

export { TimeoffVertical };
export default Timeoff;
