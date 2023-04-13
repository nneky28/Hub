import moment from 'moment';
import React, {useEffect} from 'react';
import {Keyboard} from 'react-native';
import {useMutation} from 'react-query';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomInput from '../../components/CustomInput';
import CustomModalDropdown from '../../components/CustomModalDropdown';
import ScreenWrapper from '../../components/ScreenWrapper';
import {useFetchAboutMeProps} from '../../components/TimeoffModal/types';
import {APIFunction, useFetchAboutMe} from '../../utills/api';
import {DatePickerModal, KeyboardAwareWrapper} from '../../utills/components';
import {
  Capitalize,
  ToastError,
  ToastSuccess,
  useAppSelector,
} from '../../utills/Methods';
import {Data, DataKeys} from './types';
import {RootScreenProps} from '../../Routes/types';
import {HeaderWithBackButton} from '../../components/Headers/CustomHeader';

const PersonalInfo = ({navigation}: RootScreenProps) => {
  const auth = useAppSelector((state) => state.Auth);

  const [data, setData] = React.useState<Data>({
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    birth_date: '',
    marital_status: '',
    email: '',
    address: '',
    address2: '',
    phone_number: '',
    mobileNumber2: '',
    state: '',
    city: '',
    country: '',
    postal_code: '',
  });

  const {data: profile} = useFetchAboutMe('main') as useFetchAboutMeProps;

  const {mutateAsync, isLoading: loading} = useMutation(APIFunction.edit);

  const updateProfile = async () => {
    try {
      Keyboard.dismiss();
      let failed = false;
      let required: DataKeys[] = ['first_name', 'last_name'];
      let msg = '';
      for (let req of required) {
        if (
          !data[req] ||
          (data[req] && data[req] === '') ||
          (data[req] && data[req].trim() === '')
        ) {
          msg = `"${Capitalize(req.replace('_', ' '))}" is required`;
          failed = true;
        }
      }
      if (failed) return ToastError(msg);
      if (!profile?.id) return;

      let fd = {
        title: '',
        first_name: data.first_name,
        middle_name: data.middle_name || '',
        last_name: data.last_name,
        birth_date: data?.birth_date
          ? moment(data.birth_date).format('YYYY-MM-DD')
          : null,
        marital_status: data?.marital_status
          ? data.marital_status.toLowerCase()
          : '',
        gender: data?.gender || '',
        phone_number1: data.phone_number || '',
        phone_number2: data.mobileNumber2 || '',
        address: {
          address1: data.address || '',
          address2: data.address2 || '',
          country: 'NG',
          state: data.state || '',
          city: data.city || '',
          postal_code: data.postal_code || '',
        },
      };

      let res = await mutateAsync({...fd, id: profile?.id});
      if (res) {
        ToastSuccess('Profile Updated');
      }

      if (auth.route !== 'main') {
        return navigation.navigate('Profile', {screen: 'NextKin'});
      }
      navigation.goBack();
    } catch (err: any) {
      ToastError(err?.msg);
    }
  };

  const [show, setShow] = React.useState<boolean>(false);
  // const [action, setAction] = React.useState(null)

  const getProfile = async () => {
    try {
      if (profile) {
        setData({
          first_name: profile?.first_name || '',
          middle_name: profile?.middle_name || '',
          last_name: profile?.last_name || '',
          gender: profile.gender || '',
          birth_date: profile.birth_date || '',
          marital_status: profile.marital_status || '',
          email: profile?.email || '',
          address: profile?.address?.address1 || '',
          address2: profile?.address?.address2 || '',
          phone_number: profile?.phone_number1 || '',
          mobileNumber2: profile?.phone_number2 || '',
          city: profile?.address?.city || '',
          state: profile?.address?.state || '',
          country: profile?.address?.country_display || '',
          postal_code: profile?.address?.postal_code || '',
        });
      }
    } catch (err) {}
  };

  useEffect(() => {
    getProfile();
  }, [profile]);

  return (
    <ScreenWrapper scrollEnabled={false}>
      <HeaderWithBackButton
        headerText="  Personal Information"
        rightButtonText="Save"
        onSubmitHandler={updateProfile}
        isLoading={loading}
      />
      <KeyboardAwareWrapper>
        <CustomInput
          placeholder="First Name"
          value={data.first_name}
          onChangeData={(value) => setData({...data, first_name: value})}
        />
        <CustomInput
          placeholder="Middle Name"
          value={data.middle_name}
          onChangeData={(value) => setData({...data, middle_name: value})}
        />
        <CustomInput
          placeholder="Last Name"
          value={data.last_name}
          onChangeData={(value) => setData({...data, last_name: value})}
        />
        <CustomModalDropdown
          placeholder="Gender"
          defaultValue={
            data.gender === 'M'
              ? 'Male'
              : data.gender === 'F'
              ? 'Female'
              : data.gender === 'O'
              ? 'Not Specified'
              : 'Gender'
          }
          onChangeData={(value) =>
            setData({
              ...data,
              gender: value === 'Male' ? 'M' : value === 'Female' ? 'F' : 'O',
            })
          }
          options={['Male', 'Female', 'Not Specified']}
        />

        <CustomModalDropdown
          placeholder="Marital Status"
          defaultValue={data.marital_status}
          onChangeData={(value) => setData({...data, marital_status: value})}
          options={['Single', 'Married', 'Divorced']}
        />
        <CustomDatePicker
          placeholder="Date of Birth"
          value={data.birth_date}
          onChangeData={(value) => setData({...data, birth_date: value})}
          setShow={() => {
            // setAction("dob")
            setShow(true);
          }}
        />
        <CustomInput
          placeholder="Email"
          keyboardType="email-address"
          editable={false}
          value={data.email}
          onChangeData={(value) => setData({...data, email: value})}
        />

        <CustomInput
          placeholder="Address"
          value={data.address}
          onChangeData={(value) => setData({...data, address: value})}
        />

        <CustomInput
          placeholder="Address 2"
          value={data.address2}
          onChangeData={(value) => setData({...data, address2: value})}
        />
        <CustomInput
          placeholder="Mobile Number 1"
          keyboardType="phone-pad"
          value={data.phone_number}
          onChangeData={(value) => setData({...data, phone_number: value})}
        />
        <CustomInput
          placeholder="Mobile Number 2 (Optional)"
          keyboardType="phone-pad"
          value={data.mobileNumber2}
          onChangeData={(value) => setData({...data, mobileNumber2: value})}
        />

        <CustomModalDropdown
          placeholder="Country"
          defaultValue={data.country || 'Country'}
          onChangeData={(value) => setData({...data, country: value})}
          options={['Nigeria']}
        />
        <CustomInput
          placeholder="City"
          keyboardType="default"
          value={data.city}
          onChangeData={(value) => setData({...data, city: value})}
        />
        <CustomInput
          placeholder="State"
          keyboardType="default"
          value={data.state}
          onChangeData={(value) => setData({...data, state: value})}
        />

        <CustomInput
          placeholder="Postal Code"
          keyboardType="number-pad"
          value={data.postal_code}
          onChangeData={(value) => setData({...data, postal_code: value})}
        />
      </KeyboardAwareWrapper>
      <>
        {show ? (
          <DatePickerModal
            onChangeData={(date) => {
              setData({
                ...data,
                birth_date: moment(new Date(date)).format('YYYY-MM-DD'),
              });
              setShow(false);
            }}
            mode="date"
            current={data.birth_date}
            setShow={setShow}
            show={show}
          />
        ) : null}
      </>
    </ScreenWrapper>
  );
};
export default PersonalInfo;
