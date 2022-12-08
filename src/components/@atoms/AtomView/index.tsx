import React, { FC } from 'react';
import { AtomViewStyled } from './styled';
import { AtomViewTypes } from './types';

const AtomView: FC<AtomViewTypes> = (props) => {
  const { children } = props;
  return <AtomViewStyled {...props}>{children}</AtomViewStyled>;
};

export default AtomView;
