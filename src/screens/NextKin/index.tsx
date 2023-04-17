import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import {APIFunction, useFetchAboutMe, useFetchKin} from '../../utills/api';
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
import {RootOnboardScreenProps} from '../../Routes/types';
import {useFetchKinProps} from '../Profile/types';
import {useFetchAboutMeProps} from '../../components/TimeoffModal/types';
import {Data} from './types';
import { NEXT_OF_KINS } from '../../utills/payload';

export default function NextKin({navigation}: RootOnboardScreenProps) {
  const {data: about} = useFetchAboutMe('main') as useFetchAboutMeProps;

  const {data: kinsData} = useFetchKin(about?.id) as useFetchKinProps;

  const {mutateAsync, isLoading: loading} = useMutation(
    APIFunction.update_next_of_kin,
  );
  const auth = useAppSelector((state) => state.Auth);
  const queryClient = useQueryClient();

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
      if (data.email && !validateEmail(data.email)) {
        return ToastError('Please provide a valid email address');
      }
      if (!about?.id) return;
      await mutateAsync({...data, country: 'NG', id: about.id});
      queryClient.invalidateQueries(NEXT_OF_KINS);
      if (auth.route !== 'main') {
        return navigation.navigate("Emergency");
      }
      ToastSuccess('Record has been updated');
      navigation.goBack();
    } catch (err: any) {
      ToastError(err?.msg);
    }
  };

  const getRecord = async () => {
    try {
      if (kinsData) {
        setData({
          first_name: kinsData?.first_name || '',
          last_name: kinsData?.last_name || '',
          gender: kinsData.gender || '',
          email: kinsData?.email || '',
          nationality: kinsData?.nationality || '',
          address1: kinsData?.address1 || '',
          phone_number: kinsData?.phone_number || '',
          address2: kinsData?.address2 || '',
          city: kinsData?.city || '',
          state: kinsData?.state || '',
          country: kinsData?.country_display || '',
          postal_code: kinsData?.postal_code || '',
          relationship: kinsData?.relationship || '',
        });
      }
    } catch (err) {}
  };

  useEffect(() => {
    getRecord();
  }, [kinsData]);

  return (
    <ScreenWrapper scrollEnabled={false}>
      <HeaderWithBackButton
        headerText="    Update Next of Kin"
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
          keyboardType={'numeric'}
        />
        <CustomInput
          placeholder="Email Address"
          value={data.email}
          onChangeData={(value) => {
            setData({...data, email: value});
          }}
          keyboardType={'email-address'}
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
          placeholder="Address 2"
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
          placeholder="state"
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
