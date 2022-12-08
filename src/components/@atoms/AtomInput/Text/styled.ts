import { TextInput } from 'react-native';
import styled, { css } from 'styled-components';
import { AtomInputTextTypes } from './types';

export const InputTextStyled = styled(TextInput)<AtomInputTextTypes>((props) => {
  const { theme } = props;
  return css`
    background-color: red;
    background-color: ${theme?.input?.color?.primary};
    border: 1px solid ${theme?.input?.color?.border};
    min-height: 35px;
    max-height: 200px;
    height: auto;
    border-radius: 4px;
    width: 100%;
    display: flex;
    font-size: 12px;
    padding: 0px 10px;
    font-weight: 600;

    ${props?.css?.(theme)}
  `;
});
