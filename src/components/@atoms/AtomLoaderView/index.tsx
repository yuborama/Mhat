import React, { FC } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import Lottie from 'lottie-react-native';
import { css } from 'styled-components';
import { SplashArtAtom } from '~/jotai/splashArt';

import SplashArtAnimation from 'assets/lotties/splash-loading.json';
import { CustomizeAtom } from '~/jotai/customize';
import AtomView from '../AtomView';

type Props = {
  loading?: boolean;
};

const AtomLoaderView: FC<Props> = (props) => {
  const { children, loading } = props;
  const customize = useAtomValue(CustomizeAtom);
  const [splashArt] = useAtom(SplashArtAtom);

  if (loading ?? splashArt) {
    return (
      <AtomView
        css={() => css`
          flex: 1;
          justify-content: center;
          align-items: center;
          background-color: #f9f9f9;
        `}
      >
        <Lottie
          style={{
            width: 90,
            height: 90,
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

export default AtomLoaderView;
