import { AtomWrapper } from '@ixulabs/native-ui';
import React, { FC, FCN, useState } from 'react';
import { useLocation } from 'react-router-native';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomView from '~/components/@atoms/AtomView';
import DrawerComponent from '~/components/@molecules/Drawer';
import { useSwipe } from '~/components/@molecules/Drawer/useSwipe';
import AtomBottom from '~/components/@molecules/TabBottom';

interface TestScreenType {}


const TestScreen: FCN<TestScreenType> = (props) => {
  const location = useLocation();
  console.log(`location`, location.state);
  return (
    <AtomView
      style={{
        flex: 1,
        backgroundColor: '#6a5959',
      }}
    >
      {/* <DrawerComponent position="Left">
        <AtomButton>hola</AtomButton>
      </DrawerComponent> */}

      
    </AtomView>
  );
};
export default TestScreen;
