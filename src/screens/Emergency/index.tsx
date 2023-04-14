import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import {APIFunction} from '../../utills/api';
import {KeyboardAwareWrapper} from '../../utills/components';
import {
  ToastError,
  ToastSuccess,
  useAppSelector,
  validateEmail,
} from '../../utills/Methods';
import CustomInput from '../../components/CustomInput';
import CustomModalDropdown from '../../components/CustomModalDropdown';
import {useMutation, useQueryClient} from 'react-query';
import {HeaderWithBackButton} from '../../components/Headers/CustomHeader';
import {RootScreenProps} from '../../Routes/types';
import {useFetchEmergency} from '../../utills/api';
import {useFetchEmergencyProps} from '../Profile/types';
import {useFetchAboutMe} from '../../utills/api';
import {useFetchAboutMeProps} from '../../components/TimeoffModal/types';
import {Data} from './types';

export default function Emergency({navigation}: RootScreenProps) {
  const auth = useAppSelector((state) => state.Auth);

  const queryClient = useQueryClient();

  const {data: about} = useFetchAboutMe('main') as useFetchAboutMeProps;

  const {data: emergency} = useFetchEmergency(
    about?.id,
  ) as useFetchEmergencyProps;

  const {mutateAsync, isLoading: loading} = useMutation(
    APIFunction.update_emergency,
  );

  const [data, setData] = useState<Data>({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    gender: '',
    nationality: 'NG',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    postal_code: '',
    relationship: '',
  });

  const handleSubmit = async () => {
    try {
      Keyboard.dismiss();
      if (data.email && !validateEmail(data.email.toString().trim()))
        return ToastError('Please enter a valid email');

      if (!about?.id) return;
      let res = await mutateAsync({...data, country: 'NG', id: about.id});
      console.log('RES', res);
      if (res) {
        ToastSuccess('Record has been updated');
        navigation.goBack();
      }
      if (auth.route !== 'main') {
        return navigation.navigate('Profile', {screen: 'PensionInfo'});
      }
      queryClient.invalidateQueries('emergency');
    } catch (err: any) {
      ToastError(err.msg);
    }
  };
  const getRecord = () => {
    setData({
      ...data,
      ...emergency,
      country: emergency?.country_display || '',
    });
  };
  useEffect(() => {
    getRecord();
  }, [emergency]);

  return (
    <ScreenWrapper scrollEnabled={false}>
      <HeaderWithBackButton
        headerText="Emergency Contact"
        rightButtonText="Save"
        onSubmitHandler={handleSubmit}
        isLoading={loading}
      />
      <KeyboardAwareWrapper>
        <CustomInput
          placeholder="First Name"
          value={data.first_name}
          onChangeData={(value) => {
            setData({...data, first_name: value});
          }}
        />
        <CustomInput
          placeholder="Last Name"
          value={data.last_name}
          onChangeData={(value) => {
            setData({...data, last_name: value});
          }}
        />
        <CustomInput
          placeholder="Phone Number"
          value={data.phone_number}
          onChangeData={(value) => {
            setData({...data, phone_number: value});
          }}
          keyboardType="numeric"
        />
        <CustomInput
          placeholder="Email Address"
          value={data.email}
          onChangeData={(value) => {
            setData({...data, email: value});
          }}
        />
        <CustomInput
          placeholder="Relationship"
          value={data.relationship}
          onChangeData={(value) => {
            setData({...data, relationship: value});
          }}
        />
        <CustomInput
          placeholder="Address 1"
          value={data.address1}
          onChangeData={(value) => {
            setData({...data, address1: value});
          }}
        />
        <CustomInput
          placeholder="Addrees 2"
          value={data.address2}
          onChangeData={(value) => {
            setData({...data, address2: value});
          }}
        />
        <CustomInput
          placeholder="Addrees 2"
          value={data.address2}
          onChangeData={(value) => {
            setData({...data, address2: value});
          }}
        />

        <CustomModalDropdown
          placeholder="Country"
          defaultValue={data.country || 'Country'}
          onChangeData={(value) => setData({...data, country: value})}
          options={['Nigeria']}
        />
        <CustomInput
          placeholder="State"
          value={data.state}
          onChangeData={(value) => {
            setData({...data, state: value});
          }}
        />

        <CustomInput
          placeholder="City"
          value={data.city}
          onChangeData={(value) => {
            setData({...data, city: value});
          }}
        />
        <CustomInput
          placeholder="Postal Code"
          value={data.postal_code}
          onChangeData={(value) => {
            setData({...data, postal_code: value});
          }}
        />
      </KeyboardAwareWrapper>
    </ScreenWrapper>
  );
}
