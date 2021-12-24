import React, {useEffect, useState} from 'react';
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
import { getData, ToastError } from '../../utills/Methods';
import { APIFunction } from '../../utills/api';
import { PageLoader } from '../../utills/components';
import { showFlashMessage } from '../../components/SuccessFlash';
import { useFocusEffect } from '@react-navigation/native';
import { WarningModal } from '../../components/ContactModal';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function Dashboard({navigation: {goBack}}) {

  const[todoList, setTodoList] = useState(unCompleteTodo);
  const[completeList, setCompleteList] = useState(completedTodo);
  const [loading,setLoading] = React.useState(true)
  const [processing,setProcessing] = React.useState(false)
  const [show,setShow] = React.useState(false)
  const [task,setTask] = React.useState(null)
  const [warning,setWarning] = React.useState(null)
  const getTasks = async () =>{
    try{
      let about = await getData("about_me")
      let res = await APIFunction.employee_tasks(about.id)
      let res1 = await APIFunction.employee_tasks(about.id,true)
      res && res.results && Array.isArray(res.results) ?  
      setTodoList(res.results) : setTodoList([])
      res1 && res1.results && Array.isArray(res1.results) ?  
      setCompleteList(res1.results) : setCompleteList([])
      setLoading(false)
    }catch(err){
      ToastError(err.msg)
    }
  }
  useFocusEffect(
    React.useCallback(()=>{
      getTasks()
    },[])
  )

  const markAsCompleted = async () =>{
    try{
      let about = await getData("about_me")
      setProcessing(true)
      await APIFunction.toggle_completed(about.id,task.id,{is_completed : !task.is_completed})
      if(task.is_completed){
        let arr = [...completeList].filter(item=> item.id !== task.id)
        setCompleteList([...arr])
        setTodoList([{...task,is_completed : false},...todoList])
        return showFlashMessage({title : "Marked as undone"})
      }
      let arr = [...todoList].filter(item=> item.id !== task.id)
      setProcessing(false)
      setShow(false)
      setTodoList([...arr])
      setCompleteList([{...task,is_completed : true},...completeList])
      showFlashMessage({title : "Marked as done"})
    }catch(err){
      ToastError(err.msg)
    }
  }

  const openWarningModal = (data) => {
    try{
      setTask(data)
      setWarning(`Are you sure you have completed "${data?.title}"?`)
      setShow(true)
    }catch(err){
    }
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
        {show && <Todo data={data} openWarningModal={openWarningModal}/>}
      </View>
    );
  };
  return (
    <ScreenWrapper scrollEnabled={true}>
      {
        loading ? <PageLoader /> : <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={goBack}>
            <Image resizeMode="contain" source={leftIcon} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.text}>Tasks</Text>
          <View style={{width: width(5)}} />
        </View>
        <RenderList title="To do" data={todoList} />
        <RenderList title="Completed" data={completeList} />
      </View>
      }
      <WarningModal 
              isVisible={show}
              onHide={()=>{
                setShow(false)
              }}
              question={warning}
              performAction={markAsCompleted}
              loading={processing}
              btnText={"Mark as Completed"}
            />
    </ScreenWrapper>
  );
}
