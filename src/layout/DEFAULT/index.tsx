import { FC } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { css, useTheme } from 'styled-components';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomText from '~/components/@atoms/AtomText';
import AtomView from '~/components/@atoms/AtomView';

const LAYOUTDEFAULT: FC = (props) => {
  const { children } = props;
  const theme = useTheme();
  return (
    <>
      {/* <StatusBar barStyle={'default'} backgroundColor="transparent" /> */}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme?.general?.color?.primary,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

export default LAYOUTDEFAULT;
