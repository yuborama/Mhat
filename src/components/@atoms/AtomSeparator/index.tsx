import { AtomWrapper } from '@ixulabs/native-ui';
import { FC } from 'react';
import { ViewStyle } from 'react-native';
import { FlattenSimpleInterpolation } from 'styled-components';
import { css } from 'styled-components/native';

type Props = {
  borderBottomWidth?: string;
  borderBottomColor?: string;
  customStyles?: ViewStyle;
  margin?: string;
  customCSS?: FlattenSimpleInterpolation;
};

const AtomSeparator: FC<Props> = (props) => {
  return (
    <AtomWrapper
      customCSS={css`
        margin: ${props.margin ?? '0px'};
        border-bottom-width: ${props.borderBottomWidth ?? '1px'};
        border-bottom-color: ${props.borderBottomColor ?? 'black'};
        ${props.customCSS}
      `}
    />
  );
};

export default AtomSeparator;
