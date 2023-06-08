import { StyleSheet, Image, View } from "react-native"
import Animated, { useSharedValue } from "react-native-reanimated";

interface EmojiSticker {
  // 型あとで考える
  stickerSource: any,
  imageSize: number
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

const EmojiSticker = ({stickerSource, imageSize}: EmojiSticker) => {
  const scaleImage = useSharedValue(imageSize);
  return (
    <View style={styles.emojiStickerContainer}>
      <AnimatedImage source={stickerSource} resizeMode='contain' style={{width: imageSize, height: imageSize}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  emojiStickerContainer: {
    top: -350 // 初期表示位置
  },
})

export default EmojiSticker