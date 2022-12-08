import { FC } from 'react';
import AtomSplashArt from '~/components/@atoms/AtomSplashArt';
import useMe from '~/hooks/useMe';
import { useAtom } from 'jotai';
import { SplashArtAtom } from '~/jotai/splashArt';
import { useNavigate } from 'react-router-native';
import useProject from '~/hooks/useProject';

const AUTHDEFAULT: FC = (props) => {
  const [_, setSplashArt] = useAtom(SplashArtAtom);
  const navigate = useNavigate();

  const { loading } = useMe({
    onFinaly: () => {
      setSplashArt(false);
    },
    onError: () => {
      navigate('/login');
    },
  });

  const { loading: loadingProject } = useProject();

  const { children } = props;
  return <AtomSplashArt loading={loading || loadingProject}>{children}</AtomSplashArt>;
};

export default AUTHDEFAULT;
