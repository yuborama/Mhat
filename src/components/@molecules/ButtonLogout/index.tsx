import { useAtomValue } from 'jotai';
import { useReducerAtom } from 'jotai/utils';
import { useNavigate } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomText from '~/components/@atoms/AtomText';
import { MeAtom, MeReducer, QueryMeAtom } from '~/jotai/me';
import { css, useTheme } from 'styled-components';
import isBackDark from '~/utils/isBackDark';

const ButtonLogout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { loading: loadingQueryMe, refetch } = useAtomValue(QueryMeAtom);
  const [_, setMe] = useReducerAtom(MeAtom, MeReducer);
  return (
    <AtomButton
      type="button"
      loading={loadingQueryMe}
      onPress={async () => {
        setMe({ type: 'LOGOUT' });
        await AsyncStorage.removeItem('token');
        await refetch().finally(() => {
          navigate('/login');
        });
      }}
      css={() => css`
        padding: 0px 30px;
        background-color: ${isBackDark(theme?.general?.color?.primary)};
      `}
    >
      <AtomText
        css={() => css`
          color: ${theme?.general?.color?.primary};
          font-size: 12px;
          font-weight: bold;
        `}
      >
        Logout
      </AtomText>
    </AtomButton>
  );
};

export default ButtonLogout;
