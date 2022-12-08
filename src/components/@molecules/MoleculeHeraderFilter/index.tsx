import { AtomIcon, AtomInput } from '@ixulabs/native-ui';
import { AnimatePresence, MotiView } from 'moti';
import React, { FC, useRef } from 'react';
import { Dimensions, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import { css } from 'styled-components/native';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomText from '~/components/@atoms/AtomText';
import AtomView from '~/components/@atoms/AtomView';
import BackBar from '../BackBar';
const width = Dimensions.get('window').width;

interface MoleculeHeaderFilterType {
  showSearch?: boolean;
  setShowSearch?: () => void;
  onSubmmit?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  onClear?: () => void;
  title?: string;
}

const MoleculeHeaderFilter: FC<MoleculeHeaderFilterType> = (props) => {
  const { showSearch, setShowSearch, onSubmmit, title, onClear } = props;
  const ref_input = useRef(null);
  return (
    <AnimatePresence exitBeforeEnter>
      {!showSearch && (
        <MotiView
          key="backbar"
          style={{
            width: '100%',
            backgroundColor: 'transparent',
          }}
          from={{
            translateX: showSearch ? 0 : width,
          }}
          animate={{
            translateX: showSearch ? width : 0,
          }}
          exit={{
            translateX: showSearch ? width : 0,
          }}
          transition={{
            type: 'timing',
            duration: 200,
          }}
        >
          <BackBar iconColor="#40729f">
            <AtomText
              css={() => css`
                color: #40729f;
                font-weight: bold;
                font-size: 18px;
              `}
            >
              {title}
            </AtomText>
            <AtomButton
              type="button"
              css={() => css`
                background-color: transparent;
                padding: 0px;
              `}
              onPress={() => {
                setShowSearch?.();
              }}
            >
              <AtomIcon
                color="#40729f"
                uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/icons/search.svg"
                height="20"
                width="20"
              />
            </AtomButton>
          </BackBar>
        </MotiView>
      )}
      {showSearch && (
        <MotiView
          key="searchbar"
          style={{
            width: '100%',
            backgroundColor: 'transparent',
          }}
          from={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
          transition={{
            type: 'timing',
            duration: 200,
          }}
        >
          <AtomView
            css={() => css`
              padding: 0px 20px;
            `}
          >
            <AtomInput
              id=""
              iconUri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/icons/close2.svg"
              onPressIcon={() => {
                setShowSearch?.();
                onClear?.();
              }}
              onSubmitEditing={(e) => {
                // console.log('onSubmitEditing', e.nativeEvent.text);
                onSubmmit?.(e);
              }}
              onFocus={() => {
                console.log('onFocus');
              }}
            />
          </AtomView>
        </MotiView>
      )}
    </AnimatePresence>
  );
};
export default MoleculeHeaderFilter;
