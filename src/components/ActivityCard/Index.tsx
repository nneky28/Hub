import {View, Image} from 'react-native';
import React, {FC} from 'react';
import CommonStyles from '../../utills/CommonStyles';
import {P, ImgPlaceholder} from '../../utills/components';
import styles from './styles';
import { height } from 'react-native-dimension';



type Props = {
  item: {
    logged_by: {
      photo?: string;
      first_name: string;
      last_name: string;
    };
    description?: string;
  };
};

const Index: FC<Props> = ({ item }) => {

 
  
  return (
    <View>
      <View style={styles.rowSection}>
        <View style={[CommonStyles.rowJustifySpaceBtw]}>
          {item.logged_by?.photo ? (
            <Image
              source={{uri: item.logged_by.photo}}
              style={styles.avatarStyle}
            />
          ) : (
              <View style={{ marginTop: height(1) }}>
                <ImgPlaceholder
              text={`${item.logged_by ? item.logged_by?.first_name[0] : ''} ${
                item.logged_by ? item.logged_by?.last_name[0] : ''
              }`}
              size={10}
            />
              </View>
         
          )}

          <View style={styles.textContainer1}>
            <P numberOfLines={1} style={styles.titleText}>
              {item && item?.description}
            </P>
          </View>
        </View>
      </View>

 
    </View>
       
  );
};

export default Index;
