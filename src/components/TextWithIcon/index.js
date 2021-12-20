import { useClipboard } from '@react-native-community/clipboard';
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { leftIcon, lockIcon } from '../../assets/images';
import { Images } from '../../component2/image/Image';
import CommonStyles from '../../utills/CommonStyles';
import { ImageWrap } from '../../utills/components';
import styles from './styles';

const TextWithIconCopy = ({item, iconStyle, onHide}) => {

    const [copiedText, setCopiedText] = useClipboard('');

    const handleLongPress = (title) => {
      setCopiedText(title);
      onHide();
      showMessage({
        message: 'Copied to Clipboard',
        type: 'none',
        position: 'top',
        floating: true
      });
    }
  
    return (
      <>
      <View style={[styles.contactComponentContainer]}>
        <TouchableOpacity 
        onPress={() => handleLongPress(item && item.title ? item.title : "")}
        style={[styles.row]}
        >
          <View style={CommonStyles.rowAlignItemCenter}>
            <Image resizeMode="contain" source={item.iconLeft} style={styles.iconStyle} />
            <Text style={[styles.listCompTitle, CommonStyles.marginLeft_4]}>{item && item.title ? item.title : ""}</Text>
          </View>
          <Image
          resizeMode={'contain'}
          source={item.iconRight}
          style={[styles.iconStyle, iconStyle]}
          />
        </TouchableOpacity>
        <View style={styles.line}/>
      </View>
      {/* <MessageModal isVisible={modalVisible} onHide={() => setModalVisible(false)}/> */}
      </>
    );
  };

const TextWithIcon = ({item, iconStyle, onPressHandle, containerStyle, textStyle,url}) => {

    let lock = false;

    if (item && item.title === 'Job Detail')
      lock = true;
    

    return (
      <View style={[styles.contactComponentContainer, {opacity:  lock ? 0.5 : 1}, containerStyle]}>
        <TouchableOpacity 
          style={[styles.row]}
          disabled={lock}
          onPress={onPressHandle}
        >
          <View style={CommonStyles.rowAlignItemCenter}>
            {
              url ? <ImageWrap 
                  url={item.iconLeft}
                  width={5}
                  height={3}
                  fit={'contain'}
                /> : (
                  <React.Fragment>
                    {item && item.iconLeft !== undefined && <Image resizeMode="contain" source={!url ? item.iconLeft : {uri : item.iconLeft}} style={styles.iconStyle} />} 
                  </React.Fragment>
                )
            }
            {/* <ImageWrap 
              url={item.iconLeft}
              width={5}
              height={3}
              fit={'contain'}
            /> */}
            
            <Text style={[styles.TitleText, CommonStyles.marginLeft_4, textStyle]}>{item.title}</Text>
          </View>
          {lock? <Image
                  resizeMode={'contain'}
                  source={lockIcon}
                  style={[styles.iconStyle]}
                  />
                  :
                  <Image
                  resizeMode={'contain'}
                  source={item && item.iconRight}
                  style={[styles.iconStyle, iconStyle]}
                  />
            }
        </TouchableOpacity>
        <View style={styles.line}/>
      </View>
    );
  };

export default TextWithIcon;
export { TextWithIconCopy };

