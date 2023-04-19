import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DocumentModal} from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import SearchBox, {SearchBoxIOS} from '../../components/SearchBox';
import CommonStyles from '../../utills/CommonStyles';
import {EmptyStateWrapper, PageLoader} from '../../utills/components';
import styles from './styles';
import {Images} from '../../utills/Image';
import {Capitalize} from '../../utills/Methods';
import {useFetchAboutMe, useFetchDoc} from '../../utills/api';
import moment from 'moment';
import {width} from 'react-native-dimension';
import {useFetchAboutMeProps} from '../../components/TimeoffModal/types';
import {useFetchDocumentsData, useFetchDocumentsProps} from './type';
import {HomePageHeader} from '../../components/Headers/CustomHeader';

export default function Documents() {
  const [modal, setModal] = useState<boolean>(false);
  const [documents, setDocuments] = useState<useFetchDocumentsData[]>([]);
  const [document, setDocument] = useState<useFetchDocumentsData>();
  const [holders, setHolders] = useState<useFetchDocumentsData[]>([]);

  const {data: profile} = useFetchAboutMe('main') as useFetchAboutMeProps;

  const {data: doc, isLoading: loading} = useFetchDoc(
    profile?.id,
  ) as useFetchDocumentsProps;

  const getDocuments = () => {
    let allDocument = doc?.results;
    if (allDocument && Array.isArray(allDocument)) {
      setDocuments(allDocument);
      setHolders(allDocument);
    } else {
      setDocuments([]);
      setHolders([]);
    }
  };

  const handleSearch = (text: string) => {
    if (text.length > 0) {
      let filtered = documents.filter((item) => {
        return (
          item &&
          item.file &&
          item.file.toLowerCase() &&
          item.file.toLowerCase().includes(text.toLowerCase())
        );
      });
      setDocuments(filtered);
    } else setDocuments(holders);
  };

  const ListComponent = ({item}: {item: useFetchDocumentsData}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setDocument(item);
            setModal(!modal);
          }}
          style={[styles.listItemContainer]}>
          <View style={[CommonStyles.rowJustifySpaceBtw, {width: width(80)}]}>
            <Image source={{uri: Images.FileIcon}} style={styles.fileIcon} />
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>
                {item?.name ? Capitalize(item.name) : null}
              </Text>
              <Text style={styles.subText}>
                {item && item.created_at
                  ? moment(item.created_at).format('DD MMM YYYY')
                  : null}
              </Text>
            </View>
          </View>
          <Image source={{uri: Images.DotsIcon}} style={styles.dotsIcon} />
        </TouchableOpacity>
        <View style={styles.line} />
      </>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <EmptyStateWrapper
        icon={Images.EmptyDoc}
        header_1={'You do not have'}
        header_2={'any document yet.'}
        sub_text={'When you do, they will show up here.'}
      />
    );
  };
  useEffect(() => getDocuments(), [doc]);

  return (
    <ScreenWrapper scrollEnabled={false}>
      <HomePageHeader header="Documents" image={Images.people} />

      <View style={styles.mainViewContainer}>
        {Platform.OS === 'android' ? (
          <SearchBox
            title="Search for document"
            onSubmitEditing={handleSearch}
          />
        ) : (
          <SearchBoxIOS
            title="Search for document"
            onSubmitEditing={handleSearch}
          />
        )}
        <>{loading ? <PageLoader /> : <FlatList
          data={[...documents,...documents]}
          keyExtractor={(item,i) => `${item}${i}`.toString()}
          renderItem={ListComponent}
          ItemSeparatorComponent={() => <View />}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          contentContainerStyle={CommonStyles.marginTop_2}
          ListEmptyComponent={ListEmptyComponent}
        />}</>
      </View>

      <DocumentModal
        isVisible={modal}
        onHide={() => setModal(false)}
        document={document}
      />
    </ScreenWrapper>
  );
}
