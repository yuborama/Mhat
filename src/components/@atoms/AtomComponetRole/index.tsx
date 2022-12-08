import { useAtomValue } from 'jotai';
import React, { FC } from 'react';
import { MeAtom } from '~/jotai/me';

const DefaultAccess = ['USER', 'CENSOR', 'RESEARCHER', 'ADMIN', 'SUPER_ADMIN'];

interface AtomComponentRoleType {
  AutorizationRoles?: string[];
  role?: string;
}

const AtomComponentRole: FC<AtomComponentRoleType> = (props) => {
  const me = useAtomValue(MeAtom);
  const { AutorizationRoles = DefaultAccess, children } = props;
  const role = me.role;
  if (!AutorizationRoles.includes(role)) return null;

  return <>{children}</>;
};
export default AtomComponentRole;
