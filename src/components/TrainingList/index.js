import React from 'react';
import { FlatList, Text, View } from 'react-native';
import CommonStyles from '../../utills/CommonStyles';
import styles from './styles';
import { Capitalize, getData } from '../../utills/Methods';
import moment from  "moment"

const TrainingList = ({data, opacity = 1}) => {
  console.log("TrainingList",data)
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={CommonStyles.marginTop_2} />}
      keyExtractor={(i) => String(Math.random())}
      contentContainerStyle={styles.flatList}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}
      renderItem={({item}) => {
        return (
          <View style={[styles.container]}>
            <View style={[styles.row, styles.between]}>
              <View>
                <Text style={[styles.text, {opacity: opacity}]}>{item.title ? Capitalize(item.title) : "" } </Text>
              </View>
            </View>
            <View style={[styles.row, styles.between, styles.margin1]}>
              <View style={styles.halfWidth}>
                <Text style={[styles.ttext1, {opacity: opacity}]}>Description</Text>
                <Text style={[styles.ttext, {opacity: opacity}]} numberOfLines={1}>
                  {item.description ? item.description : ""}
                </Text>
              </View>
              <View style={styles.halfWidth}>
                <Text style={[styles.ttext1, {opacity: opacity}]}>Venue</Text>
                <Text style={[styles.ttext, {opacity: opacity}]}>
                  {item.venue ? Capitalize(item.venue) : ""}
                </Text>
              </View>
            </View>
            <View style={[styles.row, styles.between, styles.margin1]}>
              <View style={[styles.row, styles.halfWidth]}>
                <Text style={[styles.ttext1, {opacity: opacity}]}>Start date:</Text>
                <Text style={[styles.ttext, {opacity: opacity}]}> 
                  {item.start_datetime ? moment(item.start_datetime).format("DD/MM/YYYY") : ""}
                </Text>
              </View>
              <View style={[styles.row, styles.halfWidth]}>
                <Text style={[styles.ttext1, {opacity: opacity}]}>End date:</Text>
                <Text style={[styles.ttext, {opacity: opacity}]}>
                {item.start_datetime ? moment(item.start_datetime).format("DD/MM/YYYY") : ""}
                </Text>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

export default TrainingList;
