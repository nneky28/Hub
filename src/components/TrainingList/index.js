import React from 'react';
import { FlatList, Text, View } from 'react-native';
import CommonStyles from '../../utills/CommonStyles';
import styles from './styles';

const TrainingList = ({data, opacity = 1}) => {
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
                <Text style={[styles.text, {opacity: opacity}]}>Onboarding Training </Text>
              </View>
            </View>
            <View style={[styles.row, styles.between, styles.margin1]}>
              <View style={styles.halfWidth}>
                <Text style={[styles.ttext1, {opacity: opacity}]}>Department</Text>
                <Text style={[styles.ttext, {opacity: opacity}]}>Department Design and tech lead</Text>
              </View>
              <View style={styles.halfWidth}>
                <Text style={[styles.ttext1, {opacity: opacity}]}>Virtual</Text>
                <Text style={[styles.ttext, {opacity: opacity}]}>Online</Text>
              </View>
            </View>
            <View style={[styles.row, styles.between, styles.margin1]}>
              <View style={[styles.row, styles.halfWidth]}>
                <Text style={[styles.ttext1, {opacity: opacity}]}>Start date:</Text>
                <Text style={[styles.ttext, {opacity: opacity}]}> 02/06/ 2021</Text>
              </View>
              <View style={[styles.row, styles.halfWidth]}>
                <Text style={[styles.ttext1, {opacity: opacity}]}>End date:</Text>
                <Text style={[styles.ttext, {opacity: opacity}]}> 02/06/ 2021</Text>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

export default TrainingList;
