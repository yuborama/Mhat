import React, { useMemo } from 'react';
import Home from './home';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Login from './login';
import Register from './register';
import Recover from './recover';
import Auth from '~/auth';
import ServiceCodeName from './services/[codeName]';
import ServiceVideoCall from './services/videocall';
import ServiceVideoCallRoom from './services/videocall/[room]';
import TestScreen from './services/test';
import AdminCreateScreen from './admin/create';
import OwnerCreateScreen from './owner/create';
import AdminListScreen from './admin/list';
import AdminByIdScreen from './admin/[id]';
import PetCreateScreen from './pet/create';
import PetListScreen from './pet/list';
import PetByIdScreen from './pet/[id]';
import OwnerListScreen from './owner/list';
import OwnerByIdScreen from './owner/[id]';
import { MeAtom } from '~/jotai/me';
import { useAtomValue } from 'jotai';
import { IEnumRole } from '~/types/schemas';
// import TestScreen from './testDrawer';
import CensorListScreen from './censor/list';
import CensorCreateScreen from './censor/create';
import CensorByIdScreen from './censor/[id]';
import Cauchi from './cauchy';

type IViews = {
  [key in IEnumRole]: (e?: IEnumRole) => JSX.Element;
};

const VIEWS = {
  DEFAULT: () => (
    <Routes>
      <Route path="/" element={<Cauchi />} />
      <Route path="/login" element={<Cauchi />} />
    </Routes>
  ),
  USER: () => (
    <Routes>
      <Route path="/" element={<OwnerByIdScreen />} />
      <Route path="/login" element={<Login auth="login" />} />
      <Route path="/Pet/:id" element={<PetByIdScreen />} />
    </Routes>
  ),
  ADMIN: () => (
    <Routes>
      <Route path="/" element={<Home auth="default" />} />
      <Route path="/login" element={<Login auth="login" />} />
      <Route path="/register" element={<Register auth="login" />} />
      <Route path="/recover" element={<Recover auth="login" />} />
      <Route path="/videocall" element={<ServiceVideoCall />} />
      <Route path="/videocall/:room" element={<ServiceVideoCallRoom />} />
      <Route path="/:codeName" element={<ServiceCodeName />} />
      <Route path="/listOwner" element={<TestScreen />} />
      <Route path="/Owner/list" element={<OwnerListScreen />} />
      <Route path="/Owner/create" element={<OwnerCreateScreen />} />
      <Route path="/Owner/:id" element={<OwnerByIdScreen />} />
      <Route path="/Pet/list" element={<PetListScreen />} />
      <Route path="/Pet/create">
        <Route index element={<PetCreateScreen />} />
        <Route path=":id" element={<PetCreateScreen />} />
      </Route>
      <Route path="/Pet/:id" element={<PetByIdScreen />} />
      <Route path="/Censor/list" element={<CensorListScreen />} />
      <Route path="/Censor/create" element={<CensorCreateScreen />} />
      <Route path="/Censor/:id" element={<CensorByIdScreen />} />
    </Routes>
  ),
  CENSOR: () => (
    <Routes>
      <Route path="/" element={<Home auth="default" />} />
      <Route path="/login" element={<Login auth="login" />} />
      <Route path="/register" element={<Register auth="login" />} />
      <Route path="/recover" element={<Recover auth="login" />} />
      <Route path="/videocall" element={<ServiceVideoCall />} />
      <Route path="/videocall/:room" element={<ServiceVideoCallRoom />} />
      <Route path="/:codeName" element={<ServiceCodeName />} />
      <Route path="/listOwner" element={<TestScreen />} />
      <Route path="/Owner/list" element={<OwnerListScreen />} />
      <Route path="/Owner/create" element={<OwnerCreateScreen />} />
      <Route path="/Owner/:id" element={<OwnerByIdScreen />} />
      <Route path="/Pet/list" element={<PetListScreen />} />
      <Route path="/Pet/create">
        <Route index element={<PetCreateScreen />} />
        <Route path=":id" element={<PetCreateScreen />} />
      </Route>
      <Route path="/Pet/:id" element={<PetByIdScreen />} />
    </Routes>
  ),
  SUPER_ADMIN: () => (
    <Routes>
      <Route path="/" element={<Home auth="default" />} />
      <Route path="/login" element={<Login auth="login" />} />
      <Route path="/register" element={<Register auth="login" />} />
      <Route path="/recover" element={<Recover auth="login" />} />
      <Route path="/videocall" element={<ServiceVideoCall />} />
      <Route path="/videocall/:room" element={<ServiceVideoCallRoom />} />
      <Route path="/:codeName" element={<ServiceCodeName />} />
      <Route path="/listOwner" element={<TestScreen />} />
      <Route path="/Admin" element={<AdminListScreen />} />
      <Route path="/Admin/create" element={<AdminCreateScreen />} />
      <Route path="/Admin/:id" element={<AdminByIdScreen />} />
      <Route path="/Owner/list" element={<OwnerListScreen />} />
      <Route path="/Owner/create" element={<OwnerCreateScreen />} />
      <Route path="/Owner/:id" element={<OwnerByIdScreen />} />
      <Route path="/Pet/list" element={<PetListScreen />} />
      <Route path="/Pet/create">
        <Route index element={<PetCreateScreen />} />
        <Route path=":id" element={<PetCreateScreen />} />
      </Route>
      <Route path="/Pet/:id" element={<PetByIdScreen />} />
      <Route path="/Censor/list" element={<CensorListScreen />} />
      <Route path="/Censor/create" element={<CensorCreateScreen />} />
      <Route path="/Censor/:id" element={<CensorByIdScreen />} />
    </Routes>
  ),
} as IViews;

const Index = () => {
  const me = useAtomValue(MeAtom);
  const selectView = useMemo(
    () => VIEWS?.[me.role]?.(me.role) ?? VIEWS.DEFAULT(me.role),
    [me.role, VIEWS]
  );
  return (
    <NativeRouter>
      <Auth exit={['/login', '/']}>{selectView}</Auth>
    </NativeRouter>
  );
};

export default Index;
