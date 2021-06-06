import React from 'react';

import { useSearch } from 'utils/useSearch';
import { Roles } from './constants';
import { SessionContext } from './context';

export type SessionProps = {
  role: Roles;
};

export const SessionProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const { user } = useSearch();
  const isAdmin = user === Roles.ADMIN.toLowerCase();
  return (
    <SessionContext.Provider
      value={{
        role: isAdmin ? Roles.ADMIN : Roles.USER,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export * from './context';
export * from './constants';
export * from './utils';
