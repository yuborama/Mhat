import { FC } from 'react';
import AtomSplashArt from '~/components/@atoms/AtomSplashArt';

const LAYOUTLOGIN: FC = (props) => {
  const { children } = props;
  return <AtomSplashArt>{children}</AtomSplashArt>;
};

export default LAYOUTLOGIN;
