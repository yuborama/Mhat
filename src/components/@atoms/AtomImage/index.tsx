import { FC } from 'react';
import { ImageStyled } from './styled';
import { AtomImageTypes } from './types';

const AtomImage: FC<AtomImageTypes> = (props) => {
  return <ImageStyled {...props} />;
};
export default AtomImage;
