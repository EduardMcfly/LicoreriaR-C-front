import { Roles } from './constants';
import { useSession } from './context';
export const useIsRole = (value: Roles) => {
  const { role } = useSession();
  return role === value;
};

export const useIsAdmin = () => useIsRole(Roles.ADMIN);
export const useIsUser = () => useIsRole(Roles.USER);
