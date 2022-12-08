import { useAtom } from 'jotai';
import { FC } from 'react';
import AtomSplashArt from '~/components/@atoms/AtomSplashArt';
import { SplashArtAtom } from '~/jotai/splashArt';
import useMe from '~/hooks/useMe';
import { useNavigate } from 'react-router-native';
import useProject from '~/hooks/useProject';
import { Text } from 'react-native';

const AUTHLOGIN: FC = (props) => {
  const { children } = props;
  const [_, setSplashArt] = useAtom(SplashArtAtom);
  const navigate = useNavigate();

  const { loading } = useMe({
    onCompleted: () => {
      navigate('/');
    },
    onFinaly: () => {
      setSplashArt(false);
    },
  });

  const { loading: loadingProject } = useProject();

  return (
    <AtomSplashArt loading={loading || loadingProject}>
      {children}
    </AtomSplashArt>
  );
};

export default AUTHLOGIN;
