import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
function AnimatedView({styles, marginLeft}) {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    console.log("animatedStyles",marginLeft)
    return {
      // scaleX: withSpring(offset.value),
      transform : [{
        translateX: withSpring(marginLeft),
      }]
    };
  });
  useEffect(() => {
    console.log("marginLeft changed")
    if (marginLeft) {
      // offset.value = withSpring(marginLeft, {damping: 20}, (finished) => {
      //   if (finished) {
      //     console.log('ANIMATION ENDED');
      //   } else {
      //     console.log('ANIMATION GOT CANCELLED');
      //   }
      // });
    }
  }, [marginLeft]);
  return (
    <>
      {console.log("animatedStyles-render",animatedStyles)}
      <Animated.View style={[styles, animatedStyles]} />
    </>
  );
}

export default AnimatedView;
