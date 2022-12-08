import { Text } from 'moti/build';
import styled, { css } from 'styled-components';
import { AtomInputTypes } from './types';

export const InputErrorStyled = styled(Text)<AtomInputTypes>(
  () => css`
    font-size: 10px;
    font-weight: 700;
    color: #db4a4a;
    margin: 0px 0px 0px 0px;
    padding: 5px 0px 0px 0px;
  `
);
