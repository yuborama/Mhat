import React, { FC } from 'react';
import { AtomViewTouchableWithoutStyled } from './styled';
import { AtomViewTouchableWithoutTypes } from './types';

const AtomViewTouchableWithout: FC<AtomViewTouchableWithoutTypes> = (props) => {
  const { children } = props;
  return <AtomViewTouchableWithoutStyled {...props}>{children}</AtomViewTouchableWithoutStyled>;
};

export default AtomViewTouchableWithout;
