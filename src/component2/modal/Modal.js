import * as React from 'react';
import {View} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import CustomText from '../customText/CustomText';

const MyComponent = (props) => {
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={props.modalState} onDismiss={props.hidemodalDialog}>
        <Dialog.Content>
            {props.modalContent}
          </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default MyComponent;
