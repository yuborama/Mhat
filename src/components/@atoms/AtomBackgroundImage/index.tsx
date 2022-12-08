import React, { FC } from 'react';
import { AtomBackgroundImageStyled } from './styled';
import { AtomBackgroundImageTypes } from './types';

const AtomBackgroundImage: FC<AtomBackgroundImageTypes> = (props) => {
  const { children } = props;
  return <AtomBackgroundImageStyled {...props}>{children}</AtomBackgroundImageStyled>;
};

export default AtomBackgroundImage;
