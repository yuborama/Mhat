import React, { FC } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import Lottie from 'lottie-react-native';
import { Image } from 'react-native';
import { css } from 'styled-components';
import { SplashArtAtom } from '~/jotai/splashArt';

import SplashArtImage from 'assets/images/icon.png';
import SplashArtAnimation from 'assets/lotties/splash-loading.json';
import { CustomizeAtom } from '~/jotai/customize';
import AtomView from '../AtomView';

type Props = {
  loading?: boolean;
};

const AtomSplashArt: FC<Props> = (props) => {
  const { children, loading } = props;
  const customize = useAtomValue(CustomizeAtom);
  const [splashArt] = useAtom(SplashArtAtom);

  if (loading ?? splashArt) {
    return (
      <AtomView
        css={() => css`
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          background-color: #f9f9f9;
        `}
      >
        <Image
          style={{ width: 300, height: 100, marginBottom: 30, marginTop: 30 }}
          source={SplashArtImage}
        />
        <Lottie
          style={{
            width: 60,
            height: 60,
          }}
          colorFilters={[
            { keypath: 'icon', color: customize?.colors?.primary },
            { keypath: 'icon 2', color: customize?.colors?.primary },
          ]}
          source={SplashArtAnimation}
          autoPlay
          loop
        />
      </AtomView>
    );
  }
  return <>{children}</>;
};

export default AtomSplashArt;
