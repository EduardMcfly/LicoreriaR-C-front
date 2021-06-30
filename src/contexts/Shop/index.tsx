import React from 'react';

import { Product, useCartProducts } from 'graphqlAPI';
import { useProducts } from 'contexts/Products';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import {
  getValidAmount,
  getStorage,
  setStorage,
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
  orderDate: string | Date;
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

const array: Product[] = [];

export const ShopProvider = ({
  children,
}: React.PropsWithChildren<
  ShopPropsBase & { isCreating?: boolean }
>) => {
  const [products, setProducts] = React.useState(
    () => new Map<CartProduct['id'], CartProduct>(),
  );
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    name: '',
  });

  const [map, setMap] = React.useState<UserMap>(getStorageMap());

  const productsBase = useProducts();

  const productsLoaded = productsBase.data?.products.data;

  const [productsStorage] = React.useState(getStorage);
  const loadedStorageProducts = React.useRef(false);

  const productsNotExist = productsStorage
    .map(({ id }) => id)
    .filter(
      (id) => !productsLoaded?.some((product) => product.id === id),
    );

  const [loading, setLoading] = React.useState(true);

  const cartProducts = useCartProducts({
    variables: {
      products: productsNotExist,
    },
    skip:
      !!productsBase.loading || !productsNotExist.length || !loading,
  });

  const loadingAll = productsBase.loading || cartProducts.loading;

  React.useEffect(() => {
    if (loading && !loadingAll) setLoading(false);
  }, [loading, loadingAll]);

  const cartProductsData = cartProducts.data?.cartProducts;

  const allProducts = React.useMemo(() => {
    if (loadingAll) return array;
    return [...(productsLoaded || []), ...(cartProductsData || [])];
  }, [productsLoaded, cartProductsData, loadingAll]);

  const getProduct = React.useCallback(
    (id: CartProduct['id']) =>
      allProducts.find((product) => product.id === id),
    [allProducts],
  );

  React.useEffect(() => {
    if (loadingAll || loadedStorageProducts.current) return;
    loadedStorageProducts.current = true;
    const newProducts = new Map<string, CartProduct>();
    for (const productStorage of productsStorage) {
      const { id } = productStorage;
      const product = getProduct(id);
      if (product) {
        newProducts.set(id, {
          id,
          amount: productStorage.amount,
          product,
        });
      }
    }
    setProducts(newProducts);
  }, [productsStorage, getProduct, loadingAll]);

  const getProducts = React.useCallback(
    () => Array.from(products.values()),
    [products],
  );

  const saveStorage = React.useCallback(() => {
    setStorage(getProducts());
  }, [getProducts]);

  const addProduct = (item: CartProductBase) => {
    const { id, amount } = item;
    const product = getProduct(id);
    if (product) {
      const cartProduct = products.get(id);
      products.set(id, {
        ...item,
        amount:
          ((cartProduct && cartProduct.amount) || 0) +
          getValidAmount(amount),
        product,
      });
      setProducts(new Map(products));
      saveStorage();
    }
  };

  const changeAmount = (item: CartProductBase) => {
    const { id, amount } = item;
    const product = products.get(id);
    if (product) {
      products.set(id, {
        ...product,
        amount: getValidAmount(amount),
      });
      setProducts(new Map(products));
      saveStorage();
    }
  };

  const removeProduct = (id: CartProduct['id']) => {
    products.delete(id);
    setProducts(new Map(products));
    saveStorage();
  };

  const removeProducts = () => {
    setProducts(new Map());
    saveStorage();
  };

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
      const dateFormat = 'yyyy-MM-dd';
      const newValue =
        orderDate instanceof Date
          ? orderDate
          : parse(orderDate, dateFormat, new Date());

      if (!isNaN(+newValue))
        newState = setState({
          orderDate: newValue,
          orderTime: getNewHour(userInfo.orderTime, newValue),
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
