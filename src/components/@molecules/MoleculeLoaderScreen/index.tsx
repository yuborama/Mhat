import React, { FC } from 'react';
import { css, useTheme } from 'styled-components/native';
import AtomLoader from '~/components/@atoms/AtomLoader';
import AtomView from '~/components/@atoms/AtomView';

interface MoleculeLoaderScreenType {
  loading?: boolean;
}

const MoleculeLoaderScreen: FC<MoleculeLoaderScreenType> = (props) => {
  const { loading, children } = props;
  const theme = useTheme();
  return (
    <AtomView
      css={() => css`
        flex: 1;
      `}
    >
      {loading && (
        <AtomView
          css={() => css`
            background-color: rgba(0, 0, 0, 0.7);
            align-items: center;
            justify-content: center;
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 1;
          `}
        >
          <AtomLoader loading color={theme?.loader?.color?.primary} />
        </AtomView>
      )}
      {children}
    </AtomView>
  );
};
export default MoleculeLoaderScreen;
