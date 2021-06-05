import React from 'react';

import { Product } from 'graphqlAPI';
import { useProducts } from 'contexts/Products';
import { useCartProducts } from '../../graphqlAPI/cart';
import { getValidAmount } from './utils';

interface CartProductBase {
  id: Product['id'];
  amount: number;
}

export interface CartProduct extends CartProductBase {
  product: Product;
}

interface ShopPropsBase {}

interface ShopProps extends ShopPropsBase {
  products: CartProduct[];
  addProduct: (item: CartProductBase) => void;
  changeAmount: (item: CartProductBase) => void;
  removeProduct: (item: CartProduct['id']) => void;
  loading: boolean;
}

const key = 'products';

const ShopContext = React.createContext<ShopProps>(
  Object.create(null),
);

const getStorage = () => {
  try {
    const products: CartProductBase[] = JSON.parse(
      localStorage.getItem(key) || '',
    );
    return products;
  } catch (error) {
    return [];
  }
};

export * from './utils';

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

  const productsStorage = getStorage();

  const productsNotExist = productsStorage
    .map(({ id }) => id)
    .filter(
      (id) => !productsLoaded?.some((product) => product.id === id),
    );

  const cartProducts = useCartProducts({
    variables: {
      products: productsNotExist,
    },
    skip: !!productsBase.loading || !productsNotExist.length,
  });

  const loading = productsBase.loading || cartProducts.loading;

  const cartProductsData = cartProducts.data?.cartProducts;
  const allProducts = React.useMemo(() => {
    if (loading) return array;
    return [...(productsLoaded || []), ...(cartProductsData || [])];
  }, [productsLoaded, cartProductsData, loading]);

  const getProduct = React.useCallback(
    (id: CartProduct['id']) =>
      allProducts.find((product) => product.id === id),
    [allProducts],
  );

  React.useEffect(() => {
    let newProduct = false;
    for (const productStorage of getStorage()) {
      if (!products.has(productStorage.id)) {
        const product = getProduct(productStorage.id);
        if (product) {
          newProduct = true;
          products.set(product.id, {
            id: product.id,
            amount: productStorage.amount,
            product,
          });
        }
      }
    }
    if (newProduct) setProducts(new Map(products));
  }, [products, getProduct]);

  const getProducts = React.useCallback(
    () => Array.from(products.values()),
    [products],
  );

  const saveStorage = React.useCallback(() => {
    localStorage.setItem(
      key,
      JSON.stringify(
        getProducts().map<CartProductBase>(({ id, amount }) => ({
          id,
          amount,
        })),
      ),
    );
  }, [getProducts]);

  const addProduct = (item: CartProductBase) => {
    const { id, amount } = item;
    const product = getProduct(id);
    if (product) {
      const shopProduct = products.get(id);
      products.set(id, {
        ...item,
        amount:
          ((shopProduct && shopProduct.amount) || 0) +
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
