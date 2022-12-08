import { FC } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { css, useTheme } from 'styled-components';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomText from '~/components/@atoms/AtomText';
import AtomView from '~/components/@atoms/AtomView';
import DrawerContent from '~/components/@molecules/Drawer';
import AtomBottom from '~/components/@molecules/TabBottom';

const links = [
  {
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/APPS/Proa/icons/home.svg',
    name: 'Inicio',
    route: '/login',
    state: {
      data: 'info login',
      send: 'send login',
    },
  },
  {
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/APPS/Proa/icons/norminatorssvg.svg',
    name: 'Nominadores',
    route: '/Nominators',
    state: {
      dial: '+52',
      phone: '1234567890',
      test: 'test',
    },
  },
  {
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/APPS/Proa/icons/people.svg',
    name: 'Prospectos',
    route: '/Prospects',
  },
  {
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/APPS/Proa/icons/money.svg',
    name: 'Mi negocio',
    route: '/MyBusiness',
  },
  {
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/APPS/Proa/icons/ranking.svg',
    name: 'Ranking',
    route: '/Ranking',
  },
  {
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/APPS/Proa/icons/person.svg',
    name: 'Mi perfil',
    route: '/MyProfile',
  },
];

const LAYOUTTEST: FC = (props) => {
  const { children } = props;
  const theme = useTheme();
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor="#ffffff" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme?.general?.color?.primary,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        {/* <DrawerContent> */}
          {children}
          {/* <AtomBottom links={links} />
        </DrawerContent> */}
      </SafeAreaView>
    </>
  );
};

export default LAYOUTTEST;
