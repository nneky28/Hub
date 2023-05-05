import { View, Text, Image, Keyboard } from 'react-native'
import React from 'react'
import styles from './styles'
import ScreenWrapper from '../../components/ScreenWrapper'
import { Container, H1, KeyboardAwareWrapper, SizedBox, TouchableWrapper, P } from '../../utills/components'
import CustomInput from '../../components/CustomInput'
import { HeaderWithBackButton } from '../../components/Headers/CustomHeader'
import Button from '../../components/Button'
import CommonStyles from '../../utills/CommonStyles'
import AppColors from '../../utills/AppColors'
import { TextInput } from "react-native-paper"
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, } from 'react-redux';
import { ToastError, ToastSuccess, storeData, useAppSelector, validateEmail } from '../../utills/Methods';
import { login } from '../../Redux/Actions/Auth';
import { fbkIcon, googleIcon } from '../../assets/images'

const index = ({ navigation }) => {
  const [secure, setSecure] = React.useState(true)
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    fullName: '',
    email: "",
    password: ""
  })
  const auth = useAppSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const about_me = {
    first_name: "Ezema"
  }

  const handleSubmit = async () => {
    try {
      Keyboard.dismiss()
      if (
        !data.email ||
        data.email.trim() === '' ||
        !data.password ||
        data.password.trim() === ''
      ) {
        return ToastError('All fields are required');
      }
      if (!validateEmail(data.email.toString().trim()))
        return ToastError('Please enter a valid email');
      let fd = {
        fullName: data.fullName,
        email: data.email.toString().trim(),
        password: data.password,
      };
      setLoading(true);
      let res = await storeData('sign up details', fd);
      console.log('res', res)
      setLoading(false)
      ToastSuccess('Sign up was successful');
      return navigation.navigate("Dashboard")
    } catch (error) {

    }
  }

  return (
    <ScreenWrapper style={styles.mainViewContainer}>
      <HeaderWithBackButton
        headerText={'Create an account'}
        bottomText={'Let’s create your account'}
        headerTextStyle={styles.header}
      />

      <Container >
        <KeyboardAwareWrapper scrollable={true}>
          <CustomInput
            placeholder="Enter your full name"
            keyboardType={'default'}
            onChangeData={(value) => setData({ ...data, fullName: value })}
            value={data?.fullName}
          // autoFocus
          />
          <CustomInput
            placeholder="Enter your email address"
            keyboardType={"email-address"}
            onChangeData={(value) => setData({ ...data, email: value })}
            value={data?.email}
          />
          <CustomInput
            placeholder="Enter your password"
            keyboardType={'default'}
            onChangeData={(value) => setData({ ...data, password: value })}
            value={data?.password}
            secureTextEntry={secure}
            right={<TextInput.Icon
              name={secure ? "eye" : "eye-off"} style={CommonStyles.marginTop_2}
              color={AppColors.black3}
              onPress={() => setSecure(!secure)}
              tvParallaxProperties={undefined}
              hasTVPreferredFocus={undefined}

            />}
          />
        </KeyboardAwareWrapper >

        <Container style={styles.btnCon}>
          <Button
            title="Sign Up"
            containerStyle={styles.btn}
            onPress={handleSubmit}
            isLoading={loading}
          />
        </Container>

        <SizedBox height={1} />

        <P textAlign='center' color={AppColors.black1}>Or</P>


        <Button
          title="Sign Up with Google"
          containerStyle={styles.btn1}
          textStyle={styles.text}
          logo={<Image source={googleIcon} style={styles.logo} />}
          onPress={handleSubmit}
        />

        <Button
          title="Sign Up with Facebook"
          containerStyle={styles.btn2}
          logo={<Image source={fbkIcon} style={styles.logo} />}
          onPress={handleSubmit}
        />


        <H1 textAlign='center' marginTop={8} color={AppColors.black1} style={styles.loginText}>Already a member? <P style={styles.login}>Log In</P></H1>

      </Container>
    </ScreenWrapper>
  )
}

export default index
