import React, {
  useReducer,
  FC,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { StyleSheet, Pressable, useWindowDimensions, Dimensions } from 'react-native';

import { MotiView, AnimatePresence } from 'moti';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { AtomIcon } from '@ixulabs/native-ui';
import AtomView from '~/components/@atoms/AtomView';
import { MotiPressable } from 'moti/interactions';
import { css } from 'styled-components/native';
import AtomButton from '~/components/@atoms/AtomButton';
import { useSwipe } from './useSwipe';
import AtomText from '~/components/@atoms/AtomText';
const width = Dimensions.get('window').width;

interface ComponentCloseType {
  onPress?: () => void;
}

const ComponentClose: FC<ComponentCloseType> = (props) => {
  const { onPress } = props;
  return (
    <AtomView
      css={() => css`
        width: 20%;
        height: 100%;
        background-color: transparent;
      `}
    >
      <MotiPressable
        style={{
          height: '100%',
          width: width * 0.2,
          backgroundColor: 'transparent',
        }}
        onPress={() => {
          onPress?.();
        }}
      />
    </AtomView>
  );
};

const positions = {
  Left: 'left',
  Right: 'right',
  Both: 'both',
};

type DrawerProps = {
  children: any;
  width?: number;
  height?: number;
  open?: boolean;
  position?: 'Left' | 'Right' | 'Both';
  setOpen?: Dispatch<SetStateAction<boolean>>;
  onClose?: any;
  onOpen?: any;
  onSwipeLeft?: any;
  onSwipeRight?: any;
  swipeThreshold?: number;
};

const DrawerContent: FC<DrawerProps> = (props) => {
  const { onClose, onOpen, position = 'Left', children } = props;
  const [open, setOpen] = useState(false);
  const { onTouchStart, onTouchEnd } = useSwipe({
    onSwipeLeft: () => {
      if (position === 'Left' && open === true) {
        console.log('onSwipeLeft drawer');
        setOpen?.(false);
      }
    },
    onSwipeRight: () => {
      if (position === 'Right' && open === true) {
        console.log('onSwipeRight drawer');
        setOpen(!open);
      }
    },
    rangeOffset: 6,
  });

  useEffect(() => {
    const handleOpen = () => {
      if (open) {
        onOpen?.();
      } else {
        onClose?.();
      }
    };
    handleOpen();
  }, [open]);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {!open && (
          <MotiView
            key="Header"
            style={{
              width: '100%',
              backgroundColor: 'transparent',
            }}
            from={{
              translateX: open ? 0 : width,
            }}
            animate={{
              translateX: open ? width : 0,
            }}
            exit={{
              translateX: open ? width : 0,
            }}
            transition={{
              type: 'spring',
            }}
          >
            <AtomView>
              <AtomText>hola</AtomText>
              <AtomButton
                onPress={() => {
                  setOpen?.(!open);
                }}
              >
                abrir
              </AtomButton>
            </AtomView>
          </MotiView>
        )}
        {open && (
          <MotiView
            key="Drawer"
            style={{
              position: 'absolute',
              flex: 1,
              height: '100%',
              backgroundColor: '#0000007a',
              width: width,
              flexDirection: 'row',
              zIndex: 100,
            }}
            from={{
              translateX: open ? -width : 0,
            }}
            animate={{
              translateX: open ? 0 : -width,
            }}
            exit={{
              translateX: open ? 0 : -width,
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {position === 'Left' && (
              <ComponentClose
                onPress={() => {
                  setOpen?.(!open);
                }}
              />
            )}
            <AtomView
              css={() => css`
                width: 80%;
                height: 100%;
                background-color: blue;
              `}
            >
              <ScrollView
                style={{
                  flex: 1,
                  // backgroundColor: '#14ae38',
                  width: '100%',
                  height: '100%',
                }}
              >
                <AtomView
                  css={() => css`
                    flex: 1;
                    width: 100%;
                    height: 100%;
                    background-color: aqua;
                  `}
                >
                  <AtomButton
                    onPress={() => {
                      console.log('onPress');
                      setOpen?.(false);
                    }}
                  >
                    cerrar
                  </AtomButton>
                </AtomView>
              </ScrollView>
            </AtomView>
            {position === 'Right' && (
              <ComponentClose
                onPress={() => {
                  console.log('onPress');
                  setOpen?.(false);
                }}
              />
            )}
          </MotiView>
        )}
      </AnimatePresence>
      {children}
    </>
  );
};

export default DrawerContent;
