import React, {useEffect, useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  APIFunction,
  useFetchAboutMe,
  useFetchBanking,
  useFetchProviders,
} from '../../utills/api';
import {Container, ItemListModal, useDebounce} from '../../utills/components';
import {
  Capitalize,
  ToastError,
  ToastSuccess,
  useAppSelector,
} from '../../utills/Methods';
import styles from './styles';
import CustomInput from '../../components/CustomInput';
import CustomModalDropdown from '../../components/CustomModalDropdown';
import {useMutation} from 'react-query';
import {useFetchAboutMeProps} from '../../components/TimeoffModal/types';
import {RootScreenProps} from '../../Routes/types';
import {HeaderWithBackButton} from '../../components/Headers/CustomHeader';
import {Data, DataKeys} from './types';
import {updatePensionAccountProps} from '../../utills/payload';

const PensionInfo = ({navigation}: RootScreenProps) => {
  const [data, setData] = useState<Data>({
    account_name: '',
    account_number: '',
    pension_number: '',
    bank_code: '',
    bank_name: '',
    prov_name: '',
  });

  const [disabled, setDisabled] = useState(false);
  const auth = useAppSelector((state) => state.Auth);
  const [visible, setVisible] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [reload, setReload] = React.useState('');
  const reloadTerm = useDebounce(reload, 200);

  const {mutateAsync: updatePension, isLoading: loading} = useMutation(
    APIFunction.update_pension,
  );

  const {mutateAsync: bankVerify, isLoading: verifying} = useMutation(
    APIFunction.bank_verification,
  );

  const {data: banks, isFetching: fetchingBanks} = useFetchBanking();

  const {data: providers, isFetching: fetchingProviders} = useFetchProviders();

  const {data: profile} = useFetchAboutMe('main') as useFetchAboutMeProps;

  console.log('profile', profile);

  const handleSubmit = async (param: string) => {
    try {
      let required: DataKeys[] =
        data?.account_number || data?.bank ? ['account_number', 'bank'] : [];
      if (data?.pension_number || data?.provider) {
        required = ['pension_number', 'provider'];
      }
      let failed = false;
      let msg = '';
      for (let req of required) {
        if (
          !data[req] ||
          data[req] === '' ||
          data[req]?.toString().trim() === ''
        ) {
          failed = true;
          msg = `${Capitalize(req.replace('_', ' '))} is required`;
        }
      }
      //CHECK FOR ONDEBOUNCE SUBMISSION
      if (
        (failed && param === 'reload') ||
        (reloadTerm === '' && param === 'reload')
      )
        return;
      if (param === 'reload' && data.account_number.length < 10) return;

      //CHECK FOR BUTTON PRESS SUBMISSION
      Keyboard.dismiss();
      if (failed) {
        return ToastError(msg);
      }
      if (
        required.length &&
        required.includes('account_number') &&
        data.account_number.length < 10
      ) {
        return ToastError('Please provide a valid account number.');
      }
      if (required.length && required.includes('account_number') && disabled) {
        let fd = {
          bank_code: data.bank_code,
          account_number: data.account_number,
        };
        let res = (await bankVerify(fd)) as Awaited<{account_name: string}>;
        // console.log('Res', res);
        return setData({...data, account_name: res.account_name as string});
      }
      if (!profile?.id) return;

      let fd: updatePensionAccountProps = {
        is_pension_applicable: false,
        id: profile?.id,
      };

      if (data.bank) {
        fd['bank_account'] = {
          bank: data.bank as number,
          account_number: data.account_number,
        };
      }
      if (data.provider) {
        fd['pension'] = {
          provider: data.provider as number,
          pension_number: data.pension_number,
        };
        fd['is_pension_applicable'] = true;
      }

      let res = await updatePension({...fd});
      if (res) {
        ToastSuccess('Record has been saved');
      }
      if (auth.route !== 'main') {
        return navigation.navigate('Profile', {screen: 'EditPhoto'});
      }
      return navigation.goBack();
    } catch (err: any) {
      let msg =
        err.msg && err.msg.detail && typeof err.msg.detail == 'string'
          ? err.msg.detail
          : 'Something went wrong. Please retry';
      console.log('ERROR', msg);
      ToastError(msg);
    }
  };

  const fetchRecord = async () => {
    try {
      setData({
        account_name: profile?.bank_account?.account_name || '',
        account_number: profile?.bank_account?.account_number || '',
        bank_code: profile?.bank_account?.bank?.code || '',
        pension_number: profile?.pension?.pension_number || '',
        bank: profile?.bank_account?.bank?.id || '',
        provider: profile?.pension?.provider?.id || '',
        bank_name: profile?.bank_account?.bank?.name || '',
        prov_name: profile?.pension?.provider?.name || '',
      });
      profile?.bank_account?.account_name
        ? setDisabled(false)
        : setDisabled(true);
    } catch (err: any) {
      ToastError(err.msg);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, [profile]);

  useEffect(() => {
    handleSubmit('reload');
  }, [reloadTerm]);

  return (
    <ScreenWrapper>
      <HeaderWithBackButton
        headerText="    Update Information"
        rightButtonText="Save"
        onSubmitHandler={(param?: string) => {
          handleSubmit(param!);
        }}
        isLoading={loading || verifying}
      />
      <Container flex={1}>
        <Container>
          <Container paddingHorizontal={5} marginTop={2} marginLeft={5}>
            <Text numberOfLines={1} style={styles.screenTitle}>
              Bank Information
            </Text>
            <View style={styles.line} />
          </Container>
          {!disabled ? (
            <CustomInput
              placeholder="Account Name"
              value={data.account_name ?? ''}
              editable={false}
              onChangeData={() => null}
            />
          ) : null}
          <CustomModalDropdown
            placeholder="Bank"
            defaultValue={data.bank_name || ''}
            setOpen={setOpen}
          />
          <CustomInput
            placeholder="Account Number"
            value={data.account_number}
            onChangeData={async (value) => {
              setData({...data, account_number: value});
              setDisabled(true);
              setReload(value);
            }}
            keyboardType={'numeric'}
            maxLength={10}
          />
          <Container paddingHorizontal={5} marginTop={2} marginLeft={5}>
            <Text numberOfLines={1} style={styles.screenTitle}>
              Pension Information
            </Text>
            <View style={styles.line} />
          </Container>

          <CustomModalDropdown
            placeholder="Pension Provider"
            defaultValue={data.prov_name || ''}
            setOpen={setVisible}
          />

          <CustomInput
            placeholder="Pension Number"
            value={data.pension_number}
            onChangeData={async (value) =>
              setData({...data, pension_number: value})
            }
            keyboardType={'numeric'}
          />
        </Container>
      </Container>
      <>
        {visible ? (
          <ItemListModal
            data={providers as Array<{id: string; name: string}>}
            setOpen={() => setVisible(false)}
            open={visible}
            onPressHandler={(item) => {
              let load = {
                ...data,
                provider: item.id,
                prov_name: item.name,
              };
              setData(load);
              setVisible(false);
            }}
            header_1={'You have added'}
            header_2={'no provider yet.'}
            sub_text={'They will show up here when you do.'}
            loading={fetchingProviders}
          />
        ) : null}
      </>
      <>
        {open ? (
          <ItemListModal
            data={banks as Array<{id: string; name: string}>}
            setOpen={() => setOpen(false)}
            open={open}
            onPressHandler={(item) => {
              let load = {
                ...data,
                bank: item.id,
                bank_name: item.name,
                bank_code: item.code,
              };
              setDisabled(true);
              setData(load);
              setReload(item.code);
              setOpen(false);
            }}
            header_1={'You have added'}
            header_2={'no banks yet.'}
            sub_text={'hey will show up here when you do.'}
            loading={fetchingBanks}
          />
        ) : null}
      </>
    </ScreenWrapper>
  );
};

export default PensionInfo;
