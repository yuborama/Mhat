import React, { FC } from 'react';
import { Platform } from 'react-native';
import { AtomViewKeyboardStyled } from './styled';
import { AtomViewKeyboardTypes } from './types';

const AtomViewKeyboard: FC<AtomViewKeyboardTypes> = (props) => {
  const { children } = props;
  return (
    <AtomViewKeyboardStyled
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios' ? true : false}
      {...props}
    >
      {children}
    </AtomViewKeyboardStyled>
  );
};

export default AtomViewKeyboard;
