import { FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRef, useEffect, useState } from "react";

export default function Carousel({ data, onPress, autoScroll = true }) {
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoScroll || data.length === 0) return;
    const interval = setInterval(() => {
      //endless loop, starting at index 0 if data.length is index+1
      const next = (index + 1) % data.length;
      listRef.current?.scrollToIndex({ index: next, animated: true });
      setIndex(next);
    }, 2000);
    return () => clearInterval(interval);
  }, [index, autoScroll, data]);

  return (
    <FlatList
      ref={listRef}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      getItemLayout={(data, index) => ({
        length: 190,
        offset: 190 * index,
        index,
      })}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(item)}>
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/w300" + item.poster_path,
            }}
            style={styles.poster}
          />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  poster: {
    width: 170,
    height: 250,
    marginHorizontal: 10,
    borderRadius: 12,
  },
});
