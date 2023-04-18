import {useClipboard} from '@react-native-community/clipboard';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {lockIcon} from '../../assets/images';
import CommonStyles from '../../utills/CommonStyles';
import styles from './styles';
import {TextWithIconCopyProps, TextWithProps} from './types';

const TextWithIconCopy = ({item, iconStyle, onHide}: TextWithIconCopyProps) => {
  const [, setCopiedText] = useClipboard();

  const handleLongPress = (title: string) => {
    setCopiedText(title);
    onHide();
    showMessage({
      message: 'Copied to Clipboard',
      type: 'none',
      position: 'top',
      floating: true,
    });
  };

  return (
    <>
      <View style={[styles.contactComponentContainer]}>
        <TouchableOpacity
          onPress={() => handleLongPress(item && item.title ? item.title : '')}
          style={[styles.row]}>
          <View style={CommonStyles.rowAlignItemCenter}>
            {item && item.iconLeft && (
              <Image
                resizeMode="contain"
                source={
                  typeof item.iconLeft === 'string'
                    ? {uri: item.iconLeft}
                    : item.iconLeft
                }
                style={styles.iconStyle}
              />
            )}
            <Text style={[styles.listCompTitle, CommonStyles.marginLeft_4]}>
              {item && item.title ? item.title : ''}
            </Text>
          </View>

          {item && item.iconRight && (
            <Image
              resizeMode="contain"
              source={
                typeof item.iconRight === 'string'
                  ? {uri: item.iconRight}
                  : item.iconRight
              }
              style={[styles.iconStyle, iconStyle]}
            />
          )}
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
      {/* <MessageModal isVisible={modalVisible} onHide={() => setModalVisible(false)}/> */}
    </>
  );
};

const TextWithIcon = ({
  item,
  iconStyle,
  onPressHandle,
  containerStyle,
  textStyle,
}: TextWithProps) => {
  let lock = false;

  if (item && item.title === 'Job Detail') lock = true;

  return (
    <View
      style={[
        styles.contactComponentContainer,
        {opacity: lock ? 0.5 : 1},
        containerStyle,
      ]}>
      <TouchableOpacity
        style={[styles.row]}
        disabled={lock}
        onPress={onPressHandle}>
        <View style={CommonStyles.rowAlignItemCenter}>
          <React.Fragment>
            {item && item.iconLeft ? (
              <Image
                resizeMode="contain"
                source={
                  typeof item.iconLeft === 'string'
                    ? {uri: item.iconLeft}
                    : item.iconLeft
                }
                style={styles.iconStyle}
              />
            ) : null}
          </React.Fragment>
          <Text
            style={[styles.TitleText, CommonStyles.marginLeft_4, textStyle]}>
            {item.title}
          </Text>
        </View>
        {lock ? (
          <Image
            resizeMode={'contain'}
            source={lockIcon}
            style={[styles.iconStyle, iconStyle]}
          />
        ) : (
          item &&
          item.iconRight && (
            <Image
              resizeMode={'contain'}
              source={
                typeof item.iconRight === 'string'
                  ? {uri: item.iconRight}
                  : item.iconRight
              }
              style={[styles.iconStyle]}
            />
          )
        )}
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  );
};

export default TextWithIcon;
export {TextWithIconCopy};
