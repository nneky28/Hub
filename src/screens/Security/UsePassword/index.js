import React, { useEffect} from 'react';
import {Image, Keyboard} from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import styles from './styles';
import { H1, P,Container,TouchableWrapper} from '../../../utills/components';
import Button from '../../../components/Button';
import AppColors from '../../../utills/AppColors';
import { Images } from '../../../utills/Image';
import { ICON_BUTTON_SIZE } from '../../../utills/Constants';
import CommonStyles from '../../../utills/CommonStyles';
import { Field, Formik } from 'formik';
import CustomInput from '../../../components/CustomInput';
import { Capitalize } from '../../../utills/Methods';

const UsePassword = (props) => {

  return (
    <ScreenWrapper>
        <Container flex={1}>
          <Container direction='row' 
            verticalAlignment='center'
          >
              <TouchableWrapper 
                onPress={()=>{props.navigation.goBack()}} 
                size={ICON_BUTTON_SIZE}
              >
                <Image 
                  source={{uri : Images.BackArrow}}
                  style={styles.Image1Sty}
                />
              </TouchableWrapper>
            </Container>
            <Container
              marginTop={4}
              width={90}
              alignSelf="center"
            >
               <P color={AppColors.black1}>Welcome back</P>
              <H1 fontSize={6} color={AppColors.black1} style={CommonStyles.marginTop_1}>{auth?.user?.firstName ? Capitalize(auth?.user?.firstName) : null} {auth?.user?.lastName ? `${Capitalize(auth?.user?.lastName[0])}.` : null}</H1>

              <Formik>
                <React.Fragment>
                  <Field 
                    placeholder="Password"
                    secure
                    name="password"
                    component={CustomInput}
                    secureTextEntry={true}
                    onChangeData={(text)=>{}}
                  />
                </React.Fragment>
              </Formik>
              <Button
                  title={'Submit'}
                  containerStyle={styles.btnContainer}
                  textStyle={styles.greenButtonText}
                  onPress={()=>{}}
                />
            </Container>
        </Container>
    </ScreenWrapper>
  )
}
export default UsePassword;
