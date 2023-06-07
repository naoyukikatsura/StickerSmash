import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import { StyleSheet, Pressable, View } from 'react-native';

interface CircleButtonProp {
  onPress: () => void
}

const CircleButton = ({onPress}: CircleButtonProp) => {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 42,
    padding: 3
  },
  circleButton: {
    flex: 1,
    // justifyContentは垂直方向中央寄せ
    justifyContent: 'center',
    // alignItemsは水平方向中央寄せ
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff'
  }

})

export default CircleButton