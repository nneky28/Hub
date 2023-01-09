import React, {Component, useEffect} from 'react';
import {Image, Keyboard} from 'react-native';
import styles from './styles';
import { H1, P } from '../../../utills/components';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import AppColors from '../../../utills/AppColors';
import { TouchableWrapper,Container } from '../../../utills/components';
import { Images } from '../../../component2/image/Image';
import CommonStyles from '../../../utills/CommonStyles';
import { login } from '../../../Redux/Actions/Auth';
import { setSecurityVisible } from '../../../Redux/Actions/Config';

const MobilePIN = (props) => {
  const auth = useSelector(state=>state.Auth)
  const dispatch = useDispatch()

  const onSkipHandler = () => {
    dispatch(setSecurityVisible(false))
  }

  return (
        <Container flex={1}>
          <Container direction='row' 
            horizontalAlignment={'flex-end'}
            verticalAlignment='center'
          >
            <TouchableWrapper 
                onPress={onSkipHandler} 
                isText
                width={25}
              >
                <H1 color={AppColors.black1}>Skip</H1>
              </TouchableWrapper>
          </Container>
            <Container flex={2} verticalAlignment="center" horizontalAlignment='center'>
              <Image 
                source={{uri : Images.Secret}}
                style={styles.secretIcon}
              />
              <H1 fontSize={6} color={AppColors.black1}>Set Up Mobile Pin</H1>
              <P color={AppColors.black1} style={CommonStyles.marginTop_1}>Create a safe pin to access</P>
              <P color={AppColors.black1}>your platform easily </P>
            </Container>
            <Container flex={1} verticalAlignment="flex-end">
               <Button
                  title={'Create PIN'}
                  containerStyle={styles.btnContainer}
                  textStyle={styles.greenButtonText}
                  onPress={()=>{props.setAction("create")}}
                />
            </Container>
        </Container>
  )
}
export default MobilePIN;
