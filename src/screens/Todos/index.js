import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import {leftIcon, upIcon} from '../../assets/images';
import {width} from 'react-native-dimension';
import Todo from '../../components/Todo';
import {completedTodo, unCompleteTodo} from '../../utills/data/todoData';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function Dashboard({navigation: {goBack}}) {

  const[todoList, setTodoList] = useState(unCompleteTodo);
  const[completeList, setCompleteList] = useState(completedTodo);

  const markComplete = ({item}) => {
    let toMarkIdx = todoList.findIndex(e => e.id === item.id);
    let toMark = todoList.find(e => e.id === item.id);
    setCompleteList([...completeList, toMark]);
    let newList = todoList.splice(toMarkIdx, 1);
    setTodoList(newList);
  }
  const RenderList = ({data, title}) => {
    const spinValue = new Animated.Value(0);
    const [show, setShow] = useState(true);
    const [spin, setSpin] = useState(
      spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      }),
    );
    const animate = (deg) => {
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
      }).start();
      setSpin(
        spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: deg,
        }),
      );
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    };
    const hide = () => {
      setShow((show) => {
        if (show) {
          animate(['0deg', '180deg']);
        } else {
          animate(['180deg', '0deg']);
        }
        return !show;
      });
    };
    return (
      <View style={styles.toDoContainer}>
        <TouchableOpacity onPress={hide} style={styles.row}>
          <Text style={styles.text}>{title}</Text>
          <Animated.Image
            resizeMode={'contain'}
            source={upIcon}
            style={[styles.icon1, {transform: [{rotate: spin}]}]}
          />
        </TouchableOpacity>
        <View style={styles.line} />
        {show && <Todo data={data}/>}
      </View>
    );
  };
  return (
    <ScreenWrapper scrollEnabled={true}>
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={goBack}>
            <Image resizeMode="contain" source={leftIcon} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.text}>Tasks</Text>
          <View style={{width: width(5)}} />
        </View>
        <RenderList title="To do" data={todoList}/>
        <RenderList title="Completed" data={completeList} />
      </View>
    </ScreenWrapper>
  );
}
