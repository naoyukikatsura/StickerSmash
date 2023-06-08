import ImageViewer from './components/image-viewer';
import * as ImagePicker from 'expo-image-picker'
import Button from './components/button';
import { registerRootComponent } from 'expo';
import { StyleSheet, View, ImageURISource, StatusBar, Text } from 'react-native';
import PrimaryButton from './components/primary-button';
import { useState } from 'react';
import CircleButton from './components/circle-button';
import IconButton from './components/icon-button';
import EmojiPicker from './components/emoji-picker';
import EmojiList from './components/emoji-list';

const placeholderImage: ImageURISource = require('../assets/images/background-image.png')

const App = () => {
  // 自分が選択した画像
  const [selectedImage, setSelectedImage] = useState<string>('')

  // showOptionがtrueのときモーダルを表示したい
  // showOptionの真偽値は画像が選択されたら、trueに変更する
  const [showOption, setShowOption] = useState(false)

  // isModalVisibleがtrueのときemojiPickerを表示したい
  // 写真選択後にプラスボタンをタップするとtrueに変更する
  // EmojiPickerの✗をタップするとfalseに変更する
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [pickedEmoji, setPickedEmoji] = useState()

  // 関数
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowOption(true)
    }
// このreturnの意味
    return ('please select image')
  }

  // 下のボタンがクリックされたらshowOptionの真偽値をtrueにする
  // trueになったらモーダルが表示される
  // 下のボタンがあるときはshowOptionは必ずfalseで、trueにしたい
  // リセットボタンがあるときはshowOptionは必ずtrueで、falseにしたい
  const handlePress = () => {
    setShowOption(!showOption)
  }

  const handleSticker = () => {
    setIsModalVisible(!isModalVisible)
  }

  const onSaveImageAsync = () => {}

  return (
    // メインの表示
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={placeholderImage} selectedImage={selectedImage}/>
        {/* {pickedEmoji !== null ? <EmojiSticker stickerSource={pickedEmoji}/> : null} */}
      </View>

      {/* 画面下部の表示 */}
      {/* showOptionがtrueになったときだけ写真選択ボタンの代わりにモーダルを表示させたい */}
      {showOption ?
      // trueのとき
      (
        <View style={styles.optionContainer}>
          <View style={styles.optionRow}>
            {/* MaterialIconsのnameを変数にしたい */}
            {/* アイコン横の文字を変数にしたい */}
            <IconButton icon='refresh' label='Reset' onPress={handlePress}/>
            <CircleButton onPress={handleSticker}/>
            <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync}/>
          </View>
        </View>
      )
      :
      // falseのとき
      (<View style={styles.footerContainer}>
        {/* ボーダーとアイコン付きのボタン */}
        <PrimaryButton label='Choose a photo' onPress={pickImageAsync}/>
        {/* 普通のボタン */}
        <Button label='Use this photo' onPress={handlePress}/>
      </View>)}

    {/* statusBarって何？ */}
    {/* JSX内でコメントアウトするとき */}
        <EmojiPicker isVisible={isModalVisible} onClose={handleSticker}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={handleSticker}/>

        </EmojiPicker>
    </View>
  );
}

// スタイル
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
  },
  optionContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default App

registerRootComponent(App);