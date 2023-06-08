import { useState } from "react";
import { StyleSheet, FlatList, Pressable, Image, Platform } from "react-native"

interface EmojiListProps {
  // onSelectの型あとで考える
  onSelect: any,
  onCloseModal: () => void
}

const EmojiList = ({onSelect, onCloseModal}: EmojiListProps) => {
  const [emoji] = useState([
    require('../../assets/images/emoji1.png'),
    require('../../assets/images/emoji2.png'),
    require('../../assets/images/emoji3.png'),
    require('../../assets/images/emoji4.png'),
    require('../../assets/images/emoji5.png'),
    require('../../assets/images/emoji6.png'),
  ]);


  return (
    <FlatList
      data={emoji} // 必須
      renderItem={ // 必須
        ({item, index}) => {return(
          <Pressable onPress={() => {
            onSelect(item)
            onCloseModal()
          }}>
            <Image source={item} key={index} style={styles.image}/>
          </Pressable>
        )}
      }
      horizontal // デフォルトで縦なので横にリスト表示できる
      showsHorizontalScrollIndicator={Platform.OS === 'web'}


    >
    </FlatList>

  )
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
})

export default EmojiList