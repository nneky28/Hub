import React from 'react';
import {FlatList, Image, Linking, Text, View} from 'react-native';
import {width} from 'react-native-dimension';
import {Images} from '../../utills/Image';
import CommonStyles from '../../utills/CommonStyles';
import {Container, EmptyStateWrapper} from '../../utills/components';
import {Capitalize, ToastError} from '../../utills/Methods';
import Button from '../Button';
import styles from './styles';
import {twoMenIcon} from '../../assets/images';
import {BenefitListProps} from './type';
import {useFetchBenefitsData} from '../../screens/Dashboard/types';

const BenifitList: React.FC<BenefitListProps> = ({
  data,
  horizontal = false,
  benefits,
  goToWeb,
}) => {
  let color = '';
  const ListEmptyComponent = () => {
    return (
      <EmptyStateWrapper
        icon={Images.EmptyBenefits}
        header_1={'You have no active'}
        header_2={'benefits yet.'}
        sub_text={'When you do, they will show up here.'}
      />
    );
  };

  const canOpenUrl = async (item: useFetchBenefitsData) => {
    try {
      let url = item && item.website ? item.website : '';
      if (!goToWeb || url === '') return;
      await Linking.canOpenURL(url);
      goToWeb(url);
    } catch (err: any) {
      ToastError('Invalid link :(');
    }
  };

  const RenderItem = ({item}: {item: useFetchBenefitsData}) => {
    color = color === data[0] ? data[1] : data[0];
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: color},
          !horizontal && {width: width(90)},
        ]}>
        <View style={[styles.row, styles.between]}>
          <Container width={50} backgroundColor={'transparent'}>
            <View style={styles.row}>
              <Text style={styles.text}>
                {item && item.plan ? Capitalize(item.plan) : ''}
              </Text>
            </View>
            <Text style={styles.text1}>
              {item && item.provider ? Capitalize(item.provider) : ''}
            </Text>
          </Container>

          <Button
            title="Visit Website"
            textStyle={styles.buttonText}
            containerStyle={styles.button}
            onPress={() => canOpenUrl(item)}
          />
        </View>
        <View style={styles.line} />
        <View style={[styles.row, styles.between, styles.margin1]}>
          <View>
            <Text style={styles.ttext1}>Type</Text>
            <Text style={styles.ttext}>
              {item && item.category
                ? Capitalize(item.category.replaceAll('_', ' '))
                : ''}
            </Text>
          </View>
          {item && item.category !== 'pension' ? (
            <View style={styles.row}>
              <Image
                resizeMode="contain"
                source={twoMenIcon}
                style={[styles.icon, styles.margin2]}
              />
              <Text style={styles.text1}>
                {item && item.num_dependents ? item.num_dependents : 0}{' '}
                Dependents
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={benefits}
      ItemSeparatorComponent={() => (
        <View style={horizontal ? styles.margin : CommonStyles.marginTop_2} />
      )}
      keyExtractor={() => String(Math.random())}
      contentContainerStyle={styles.flatList}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}
      horizontal={horizontal}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={RenderItem}
    />
  );
};

export default BenifitList;
