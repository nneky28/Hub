import {Image} from 'react-native';
import React from 'react';
import {P, ImgPlaceholder, Container} from '../../utills/components';
import styles from './styles';
import { ActivityCardProps } from './types';
import { Capitalize } from '../../utills/Methods';
import AppColors from '../../utills/AppColors';


const ActivityCard = ({ item } : ActivityCardProps) => { 
  return (
    <Container 
      verticalAlignment="center" 
      direction="row"
      width={90} 
      alignSelf='center'
      paddingTop={1.5}
      paddingBottom={1.5}
      borderBottomWidth={1}
      borderColor={AppColors.grayBorder}
      backgroundColor={AppColors.transparent}
    >
        {item?.logged_by?.photo ? (
          <Image
            source={{uri: item?.logged_by?.photo}}
            style={styles.avatarStyle}
          />
        ) : (
            <Container width={10} backgroundColor={AppColors.transparent}>
              <ImgPlaceholder
                text={`${item?.logged_by?.first_name?.[0] ? Capitalize(item.logged_by?.first_name?.[0]) : ''} ${
                  item?.logged_by?.last_name?.[0] ? Capitalize(item.logged_by?.last_name?.[0]) : ''
                }`.trim()}
                size={10}
              />
            </Container>
        
        )}
        <Container width={70} backgroundColor={AppColors.transparent} marginLeft={2}>
          <P numberOfLines={1} style={styles.titleText}>
              {item && item?.description}
            </P>
        </Container>
    </Container>   
  );
};

export default ActivityCard;
