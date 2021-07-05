import React from 'react';

import { Product, useCartProducts } from 'graphqlAPI';
import { useProducts } from 'contexts/Products';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

import { dateFormat, orderTimeFormat } from './constants';
import { useShopProducts } from './hooks';
import {
  getMinDateTime,
  getStorageMap,
  setStorageMap,
  getNewHour,
} from './utils';
import {
  UserMap,
  CartProductBase,
  CartProduct,
  UserInfo,
} from './types';

interface ShopPropsBase {}

type ChangeMap = (
  value: Pick<UserMap, keyof UserMap> | UserMap,
) => any;

type UserInfoValues = {
  name: string;
  orderDate: string;
  orderTime: string;
};

type ChangeUserInfo = (
  value: Partial<UserInfoValues> | UserInfoValues,
) => any;

export type ChangeAmount = (item: CartProductBase) => void;
export type RemoveProduct = (item: CartProduct['id']) => void;

export interface ShopProps extends ShopPropsBase {
  products: CartProduct[];
  userInfo: UserInfo & { onChange: ChangeUserInfo };
  map: UserMap & { onChange: ChangeMap };
  addProduct: (item: CartProductBase) => void;
  changeAmount: ChangeAmount;
  removeProduct: RemoveProduct;
  removeProducts: () => void;
  loading: boolean;
}

const ShopContext = React.createContext<ShopProps>(
  Object.create(null),
);

export const ShopProvider = ({
  children,
}: React.PropsWithChildren<
  ShopPropsBase & { isCreating?: boolean }
>) => {
  const {
    loading,
    addProduct,
    getProducts,
    changeAmount,
    removeProduct,
    removeProducts,
  } = useShopProducts();

  const getFormat = (
    now: Date,
  ): Pick<UserInfo, 'orderDate' | 'orderTime'> => {
    const orderDate = format(now, dateFormat);
    return {
      orderDate,
      orderTime: getNewHour(format(now, orderTimeFormat), orderDate),
    };
  };

  const [userInfo, setUserInfo] = React.useState<UserInfo>(() => {
    const now = getMinDateTime();
    return {
      name: '',
      ...getFormat(now),
    };
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = getMinDateTime();
      const dateTime = parse(
        `${userInfo.orderDate} ${userInfo.orderTime}`,
        `${dateFormat} ${orderTimeFormat}`,
        new Date(),
      );
      if (+now > +dateTime)
        setUserInfo({
          ...userInfo,
          ...getFormat(now),
        });
    }, 1e4);
    return () => {
      clearInterval(interval);
    };
  }, [userInfo, setUserInfo]);

  const [map, setMap] = React.useState<UserMap>(getStorageMap());

  const onChangeMap: ChangeMap = ({ center, zoom }) => {
    let newState: Partial<UserMap> | null = null;
    if (center) newState = { ...(newState || {}), center };
    if (zoom) newState = { ...(newState || {}), zoom };
    if (newState) {
      const newMap = { ...map, ...newState };
      setMap(newMap);
      setStorageMap(newMap);
    }
  };

  const onChangeUserInfo: ChangeUserInfo = ({
    name,
    orderDate,
    orderTime,
  }) => {
    let newState: Partial<UserInfo> | undefined = undefined;
    const setState = (value: Partial<UserInfo>) => ({
      ...(newState || {}),
      ...value,
    });

    if (typeof name === 'string') newState = setState({ name });
    if (orderDate) {
      if (!isNaN(+orderDate))
        newState = setState({
          orderDate: orderDate,
          orderTime: getNewHour(userInfo.orderTime, orderDate),
        });
    }
    if (typeof orderTime === 'string')
      newState = setState({
        orderTime: getNewHour(orderTime, userInfo.orderDate),
      });
    if (newState) {
      const newUserInfo = { ...userInfo, ...newState };
      setUserInfo(newUserInfo);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products: getProducts(),
        addProduct,
        changeAmount,
        removeProduct,
        removeProducts,
        loading,
        map: {
          ...map,
          onChange: onChangeMap,
        },
        userInfo: { ...userInfo, onChange: onChangeUserInfo },
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export const ShopConsumer = ShopContext.Consumer;
export const useShop = () => React.useContext(ShopContext);
export * from './utils';
export * from './types';
export * from './constants';
