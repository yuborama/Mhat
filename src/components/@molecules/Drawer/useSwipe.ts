import { Dimensions, GestureResponderEvent } from 'react-native';
const windowWidth = Dimensions.get('window').width;

type SwipeProps = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  rangeOffset?: number;
};

export function useSwipe({ onSwipeLeft, onSwipeRight, rangeOffset = 4 }: SwipeProps) {
  let firstTouch = 0;

  // set user touch start position
  function onTouchStart(e: GestureResponderEvent) {
    firstTouch = e.nativeEvent.pageX;
  }

  // when touch ends check for swipe directions
  function onTouchEnd(e: GestureResponderEvent) {
    // get touch position and screen size
    const positionX = e.nativeEvent.pageX;
    const range = windowWidth / rangeOffset;
    // detect swipe direction
    const swipeLeft = firstTouch - positionX;
    const swipeRight = positionX - firstTouch;

    // console.log('swipeLeft', swipeLeft);
    // console.log('swipeRight', swipeRight);
    // console.log('firsTouch', firstTouch);
    // console.log('positionX', positionX);
    // console.log('range', range);
    // check max swipe
    const swipeMax = Math.max(swipeLeft, swipeRight);
    const isSwipe = firstTouch !== positionX;
    // check if swipe is in range

    // const swipe = () => (swipeMax > range ? onSwipeLeft?.() : onSwipeRight?.());
    // const swipeWithValid = () => (isSwipe ? swipe() : null);
    // swipeWithValid();

    if (positionX - firstTouch > range) {
      // console.log('swipe swipeRight');
      onSwipeRight && onSwipeRight();
    }
    // check if position is growing negatively and has reached specified range
    else if (firstTouch - positionX > range) {
      // console.log('swipe swipeLeft');
      onSwipeLeft && onSwipeLeft();
    }
  }

  return { onTouchStart, onTouchEnd };
}
