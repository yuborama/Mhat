import { FC } from 'react';
import { css } from 'styled-components';
import AtomText from '../AtomText';
import { AtomLinkStyled } from './styled';
import { AtomLinkTypes } from './types';

const AtomLink: FC<AtomLinkTypes> = (props) => {
  const { children } = props;
  return (
    <AtomLinkStyled {...props} underlayColor="transparent">
      <AtomText
        astheme="accent"
        css={(theme) => css`
          font-size: 14px;
          font-weight: 600;
          color: ${theme?.text?.color?.accent ?? '#e4456d'};
        `}
        {...props}
      >
        {children}
      </AtomText>
    </AtomLinkStyled>
  );
};

export default AtomLink;
