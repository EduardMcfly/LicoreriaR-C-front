import React from 'react';
import { CartProduct, CartProductBase } from '../types';
import { useProducts } from '../../Products/index';
import { useCartProducts } from '../../../graphqlAPI/cart/index';
import { getStorage, getValidAmount, setStorage } from '../utils';
import { Product } from 'graphqlAPI';

const array: Product[] = [];
export const useShopProducts = () => {
  const [products, setProducts] = React.useState(
    () => new Map<CartProduct['id'], CartProduct>(),
  );

  const productsBase = useProducts();
  const [productsStorage] = React.useState(getStorage);
  const [loading, setLoading] = React.useState(true);
  const loadedStorageProducts = React.useRef(false);

  const productsLoaded = productsBase.data?.products.data;

  const productsNotExist = productsStorage
    .map(({ id }) => id)
    .filter(
      (id) => !productsLoaded?.some((product) => product.id === id),
    );

  const cartProducts = useCartProducts({
    variables: {
      products: productsNotExist,
    },
    skip:
      !!productsBase.loading || !productsNotExist.length || !loading,
  });

  const loadingAll = productsBase.loading || cartProducts.loading;
  const cartProductsData = cartProducts.data?.cartProducts;

  const allProducts = React.useMemo(() => {
    if (loadingAll) return array;
    return [...(productsLoaded || []), ...(cartProductsData || [])];
  }, [productsLoaded, cartProductsData, loadingAll]);

  React.useEffect(() => {
    if (loading && !loadingAll) setLoading(false);
  }, [loading, loadingAll]);

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

  return {
    products,
    setProducts,
    loading,
    getProduct,
    addProduct,
    getProducts,
    saveStorage,
    changeAmount,
    removeProduct,
    removeProducts,
  };
};

export default useShopProducts;
