import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
function AnimatedView({styles, marginLeft}) {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // scaleX: withSpring(offset.value),
      transform : [{
        translateX: withSpring(marginLeft),
      }]
    };
  });
  useEffect(() => {
    if (marginLeft) {
      
    }
  }, [marginLeft]);
  return (
    <>
      <Animated.View style={[styles, animatedStyles]} />
    </>
  );
}

export default AnimatedView;
