import { atom, useAtom, useSetAtom } from 'jotai';
import { FCN, useEffect, useMemo } from 'react';
import { BackHandler } from 'react-native';
import { useLocation, useNavigate } from 'react-router-native';
import LAYOUTDEFAULT from '~/layout/DEFAULT';
import LAYOUTLOGIN from '~/layout/LOGIN';
import LAYOUTTEST from '~/layout/TEST';
import { IAuth, IChildren } from '~/types';
import AUTHDEFAULT from './DEFAULT';
import AUTHLOGIN from './LOGIN';

export const Auths = {
  default: AUTHDEFAULT,
  login: AUTHLOGIN,
};

export type AuthsKeys = keyof typeof Auths;

const SelectedAuthAtom = atom<AuthsKeys>('default');
const AuthAtom = atom((get) => Auths[get(SelectedAuthAtom)]);

export const Layouts = {
  default: LAYOUTDEFAULT,
  test: LAYOUTTEST,
  login: LAYOUTLOGIN,
};

export type LayoutsKeys = keyof typeof Layouts;

const SelectedLayoutAtom = atom<LayoutsKeys>('default');
const LayoutAtom = atom((get) => Layouts[get(SelectedLayoutAtom)]);

const Auth: FCN<IAuth> = (props) => {
  const { children, exit = ['/'] } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const setSelectedAuth = useSetAtom(SelectedAuthAtom);
  const setSelectedLayout = useSetAtom(SelectedLayoutAtom);
  const [Auth] = useAtom(AuthAtom);
  const [Layout] = useAtom(LayoutAtom);

  useEffect(() => {
    const backAction = () => {
      if (!exit.includes(location.pathname)) {
        navigate(-1);
        return true;
      }
      BackHandler.exitApp();
      return null;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [BackHandler, location.pathname]);

  useEffect(() => {
    const isChild = Array.isArray(children?.props?.children)
      ? children?.props?.children
      : [children?.props?.children];
    const getAuth = (isChild ?? []) as IChildren[];
    const findAuth = getAuth
      ?.map((e) => ({
        path: e.props.path ?? '/',
        auth: e?.props?.element?.props?.auth ?? 'default',
      }))
      ?.find((e) => e.path === location.pathname)?.auth as AuthsKeys;
    setSelectedAuth(findAuth ?? 'default');
  }, [location.pathname]);

  useEffect(() => {
    const isChild = Array.isArray(children?.props?.children)
      ? children?.props?.children
      : [children?.props?.children];
    const getLayout = (isChild ?? []) as IChildren[];
    const findLayout = getLayout
      ?.map((e) => ({
        path: e.props.path ?? '/',
        layout: e?.props?.element?.props?.layout ?? 'default',
      }))
      ?.find((e) => e.path === location.pathname)?.layout as LayoutsKeys;
    setSelectedLayout(findLayout ?? 'default');
  }, [location.pathname]);
  return (
    <Auth>
      <Layout>{children}</Layout>
    </Auth>
  );
};

export default Auth;
