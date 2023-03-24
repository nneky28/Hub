import { View } from 'react-native';
import styles from './styles';

interface Props {
  Cardcontainer?: object;
  children?: React.ReactNode;
}

const CustomCard: React.FC<Props> = ({ Cardcontainer = {}, children }) => {
  return (
    <View style={[styles.container, Cardcontainer]}>
      {children}
    </View>
  );
};

export default CustomCard;