import { StyleSheet, Image, View } from "react-native"
import { PanGestureHandler, TapGestureHandler } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, withSpring } from "react-native-reanimated";

interface EmojiStickerProps {
  // 型あとで考える
  stickerSource: any
  imageSize: number
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

const EmojiSticker = ({stickerSource, imageSize}: EmojiStickerProps) => {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    },
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const AnimatedView = Animated.createAnimatedComponent(View);

  const onDrag = useAnimatedGestureHandler({
   // context後で考える
  onStart: (event, context:any) => {
    context.translateX = translateX.value;
    context.translateY = translateY.value;
  },
  onActive: (event, context) => {
    translateX.value = event.translationX + context.translateX;
    translateY.value = event.translationY + context.translateY;
  },
});

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value},{translateY: translateY.value}],
    };
  });



  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={styles.emojiStickerContainer}>
        <TapGestureHandler  numberOfTaps={2}>
          <AnimatedImage source={stickerSource} resizeMode='contain' style={[imageStyle, {width: imageSize, height: imageSize}]}/>
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  emojiStickerContainer: {
    top: -350 // 初期表示位置
  },
})

export default EmojiSticker