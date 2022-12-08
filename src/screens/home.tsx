import { FCN } from 'react';
import { css, useTheme } from 'styled-components/native';
import { useQuery } from '@apollo/client';
import { SERVICESBYPROJECT } from '~/apollo/querys/services';
import ButtonLogout from '~/components/@molecules/ButtonLogout';
import { useAtomValue } from 'jotai';
import { ProjectAtom } from '~/jotai/project';
import AtomView from '~/components/@atoms/AtomView';
import { IQueryFilter } from '~/types';
import { SvgCssUri } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';
import { GenerateShadowBox } from '~/utils/generateBoxShadow';
import AtomButton from '~/components/@atoms/AtomButton';
import { useNavigate } from 'react-router-native';
import AtomText from '~/components/@atoms/AtomText';
import BackBar from '~/components/@molecules/BackBar';
import { AtomWrapper } from '@ixulabs/native-ui';
import MoleculeCardTask from '~/components/@molecules/MoleculeCardTask';
import { MeAtom } from '~/jotai/me';
import { typesUser } from './admin/[id]';
import AtomComponentRole from '~/components/@atoms/AtomComponetRole';
import { useLocation } from 'react-router-native';
const tasks = [
  {
    id: 1,
    text: 'Mascotas',
    image: require('../../assets/home/pet.png'),
    navigate: 'Pet/list',
    RolesAccess: ['CENSOR', 'ADMIN', 'SUPER_ADMIN'],
  },
  {
    id: 2,
    text: 'Dueños',
    image: require('../../assets/home/check.png'),
    navigate: 'Owner/list',
    RolesAccess: ['CENSOR', 'ADMIN', 'SUPER_ADMIN'],
  },
  {
    id: 3,
    text: 'Encuestadores',
    image: require('../../assets/home/detail.png'),
    navigate: 'Censor/list',
    RolesAccess: ['ADMIN', 'SUPER_ADMIN'],
  },
  {
    id: 4,
    text: 'Administradores',
    image: require('../../assets/home/list.png'),
    navigate: 'Admin',
    RolesAccess: ['SUPER_ADMIN'],
  },
];

const Home: FCN = () => {
  const navigate = useNavigate();
  const user = useAtomValue(MeAtom);
  return (
    <AtomView
      css={() => css`
        flex: 1;
      `}
    >
      <BackBar title="HOME" />
      <AtomComponentRole>
        <AtomView
          css={() => css`
            padding: 5px 20px;
            flex-direction: row;
            justify-content: flex-end;
          `}
        >
          <ButtonLogout />
        </AtomView>
      </AtomComponentRole>
      <AtomView
        css={() => css`
          flex: 1;
          padding: 10px 30px;
        `}
      >
        <AtomWrapper
          customCSS={css`
            align-items: center;
            justify-content: center;
            padding: 5px;
            border: 1px solid #cdcdcd;
            border-radius: 15px;
          `}
        >
          <AtomText
            css={() => css`
              font-size: 20px;
              font-weight: 500;
            `}
          >{`Bienvenid${user?.gender === 'FEMALE' ? 'a' : 'o'}`}</AtomText>
          <AtomText
            css={() => css`
              font-size: 30px;
              font-weight: bold;
            `}
          >
            {user?.name}
          </AtomText>
          <AtomText
            css={() => css`
              font-weight: 300;
            `}
          >
            {typesUser[user?.role as keyof typeof typesUser]}
          </AtomText>
        </AtomWrapper>
        <AtomWrapper
          customCSS={css`
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
          `}
        >
          {tasks.map((item) => (
            <MoleculeCardTask
              key={item.id}
              {...item}
              RolesAccess={item.RolesAccess}
              onPress={() =>
                navigate(`/${item.navigate}`, {
                  state: {
                    codeName: item.navigate,
                  },
                })
              }
            />
          ))}
        </AtomWrapper>
      </AtomView>
    </AtomView>
  );
};

export default Home;
