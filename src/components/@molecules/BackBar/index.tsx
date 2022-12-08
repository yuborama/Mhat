import { useNavigate } from 'react-router-native';
import AtomText from '~/components/@atoms/AtomText';
import { FC } from 'react';
import AtomView from '~/components/@atoms/AtomView';
import { css, useTheme } from 'styled-components';
import AtomButton from '~/components/@atoms/AtomButton';
import ButtonLogout from '../ButtonLogout';
import isBackDark from '~/utils/isBackDark';
import { SvgCssUri } from 'react-native-svg';
import { AtomIcon } from '@ixulabs/native-ui';
import { CSS } from '~/types';
type IBackBar = {
  title?: string;
  to?: string;
  iconColor?: string;
  stlyes?: {
    AtomView?: CSS;
  };
};

const BackBar: FC<IBackBar> = (props) => {
  const { title, to, children, iconColor, stlyes } = props;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AtomView
      css={(theme) => css`
        padding: 5px 20px;
        /* flex-direction: ${children ? 'row' : 'column'}; */
        /* justify-content: ${children ? 'space-between' : 'row'}; */
        flex-direction: row;
        justify-content: ${children ? 'space-between' : 'flex-start'};
        ${stlyes?.AtomView?.(theme)}
      `}
    >
      <AtomButton
        onPress={() => navigate(-1)}
        type="none"
        css={(theme) => css`
          flex-direction: row;
          background-color: 'transparent';
          /* background-color: red; */
          padding: 0;
        `}
      >
        <AtomIcon
          color={iconColor ? iconColor : '#ffffff'}
          uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/icons/arrowletf.svg"
          height="20"
          width="20"
        />
        <AtomIcon
          color={iconColor ? iconColor : '#ffffff'}
          uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/icons/leg.svg"
          height="20"
          width="20"
        />
      </AtomButton>
      {children}
    </AtomView>
  );
};

export default BackBar;
