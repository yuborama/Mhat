import { FC } from 'react';
import { AtomTextStyled } from './styled';
import { AtomTextTypes } from './types';

const AtomText: FC<AtomTextTypes> = (props) => {
  const { children } = props;
  return <AtomTextStyled {...props}>{children}</AtomTextStyled>;
};

export default AtomText;
