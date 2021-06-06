import React from 'react';
import { SessionProps } from './index';

export const SessionContext = React.createContext<SessionProps>(
  Object.create(null),
);

export const SessionConsumer = SessionContext.Consumer;
export const useSession = () => React.useContext(SessionContext);
