import React from 'react';

import { Product, useCartProducts } from 'graphqlAPI';
import { useProducts } from 'contexts/Products';
import {
  getValidAmount,
  getStorage,
  setStorage,
  getStorageMap,
  setStorageMap,
} from './utils';
import { UserMap, CartProductBase, CartProduct } from './types';

interface ShopPropsBase {}

type ChangeMap = (
  value: Pick<UserMap, keyof UserMap> | UserMap,
) => any;

interface ShopProps extends ShopPropsBase {
  products: CartProduct[];
  addProduct: (item: CartProductBase) => void;
  changeAmount: (item: CartProductBase) => void;
  removeProduct: (item: CartProduct['id']) => void;
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

  const productsBase = useProducts();

  const productsLoaded = productsBase.data?.products.data;

  const [productsStorage] = React.useState(getStorage);

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
    let newProduct = false;
    for (const productStorage of productsStorage) {
      const { id } = productStorage;
      const cartProduct = products.has(id);
      const product = getProduct(id);
      if (!cartProduct && product) {
        newProduct = true;
        products.set(id, {
          id,
          amount: productStorage.amount,
          product,
        });
      }
    }
    if (newProduct) setProducts(new Map(products));
  }, [productsStorage, products, getProduct, loadingAll]);

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

  return (
    <ShopContext.Provider
      value={{
        products: getProducts(),
        addProduct,
        changeAmount,
        removeProduct,
        loading,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export const ShopConsumer = ShopContext.Consumer;
export const useShop = () => React.useContext(ShopContext);
