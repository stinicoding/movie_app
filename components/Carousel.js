import { FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRef, useEffect, useState } from "react";

export default function Carousel({ data, onPress, autoScroll = true }) {
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const userScrollInProgressRef = useRef(false);

  const ITEM_WIDTH = 190;
  const END_EPSILON_PX = 1;

  const getIndexFromScrollEvent = (event) => {
    if (!event?.nativeEvent || data.length === 0) return null;
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const offsetX = contentOffset?.x ?? 0;
    const maxOffsetX =
      contentSize && layoutMeasurement
        ? Math.max(0, contentSize.width - layoutMeasurement.width)
        : null;
    const atEnd =
      typeof maxOffsetX === "number" &&
      maxOffsetX > 0 &&
      offsetX >= maxOffsetX - END_EPSILON_PX;
    const nextIndex = atEnd
      ? data.length - 1
      : Math.max(
          0,
          Math.min(Math.round(offsetX / ITEM_WIDTH), data.length - 1)
        );
    return { atEnd, nextIndex };
  };

  const handleScrollBeginDrag = () => {
    userScrollInProgressRef.current = true;
  };

  const handleScrollEndDrag = (event) => {
    // If there is no momentum, this is the final position.
    const velocityX = event?.nativeEvent?.velocity?.x;
    const hasMomentum =
      typeof velocityX === "number" ? Math.abs(velocityX) > 0 : false;
    if (!hasMomentum) {
      const result = getIndexFromScrollEvent(event);
      if (result) {
        setIndex(result.nextIndex);
        indexRef.current = result.nextIndex;
      }
      userScrollInProgressRef.current = false;
    }
  };

  const handleMomentumScrollEnd = (event) => {
    const result = getIndexFromScrollEvent(event);
    if (!result) {
      userScrollInProgressRef.current = false;
      return;
    }
    // Always treat the max scroll position as the "end" (even for auto-scroll),
    // so the next tick snaps back to the beginning reliably.
    if (result.atEnd) {
      setIndex(result.nextIndex);
      indexRef.current = result.nextIndex;
      userScrollInProgressRef.current = false;
      return;
    }
    // Otherwise, only sync index for user-driven scrolling (avoid auto-scroll overwriting).
    if (userScrollInProgressRef.current) {
      setIndex(result.nextIndex);
      indexRef.current = result.nextIndex;
    }
    userScrollInProgressRef.current = false;
  };

  useEffect(() => {
    if (!autoScroll || data.length === 0) return;
    const interval = setInterval(() => {
      if (userScrollInProgressRef.current) return;
      if (indexRef.current === data.length - 1) {
        // Snap back to beginning without animation
        listRef.current?.scrollToIndex({ index: 0, animated: false });
        setIndex(0);
        indexRef.current = 0;
      } else {
        // Continue scrolling to next item with animation
        const next = indexRef.current + 1;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        setIndex(next);
        indexRef.current = next;
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [autoScroll, data]);

  return (
    <FlatList
      ref={listRef}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      onScrollBeginDrag={handleScrollBeginDrag}
      onScrollEndDrag={handleScrollEndDrag}
      onMomentumScrollEnd={handleMomentumScrollEnd}
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
    width: 90,
    height: 150,
    marginHorizontal: 10,
    borderRadius: 12,
  },
});
