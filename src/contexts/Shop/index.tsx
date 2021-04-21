import React from 'react';

import { Product } from 'graphqlAPI';

type Item = Pick<Product, 'id'> & {
  amount: number;
};

interface ShopPropsBase {}

interface ShopProps extends ShopPropsBase {
  products: Item[];
  setProducts: React.Dispatch<React.SetStateAction<Item[]>>;
  addProduct: (item: Item) => void;
  changeAmount: (item: Item) => void;
  removeProduct: (item: Item['id']) => void;
}

const key = 'products';

const ShopContext = React.createContext<ShopProps>(
  Object.create(null),
);

const getStorage = () => {
  try {
    const products: Item[] = JSON.parse(
      localStorage.getItem(key) || '',
    );
    return products;
  } catch (error) {
    return [];
  }
};

const min = 1;

const getValue = (amount: number) => (amount < min ? min : amount);

export const ShopProvider = ({
  children,
}: React.PropsWithChildren<
  ShopPropsBase & { isCreating?: boolean }
>) => {
  const [products, setProducts] = React.useState<Item[]>(getStorage);

  const saveStorage = React.useCallback(() => {
    localStorage.setItem(key, JSON.stringify(products));
  }, [products]);

  React.useEffect(() => {
    saveStorage();
  }, [saveStorage]);

  const addProduct = (item: Item) => {
    const newItems = [item, ...products].reduce<Record<string, Item>>(
      (previousValue, currentValue) => {
        const { id, amount } = currentValue;
        if (previousValue[id])
          previousValue[id].amount += getValue(amount);
        else previousValue[id] = currentValue;
        return previousValue;
      },
      {},
    );
    setProducts(Object.values(newItems));
  };

  const changeAmount = (item: Item) => {
    const { amount } = item;
    const newProducts = products.map(
      (product): Item => {
        const { id } = product;
        if (item.id === id) return { id, amount: getValue(amount) };
        else return product;
      },
    );
    setProducts(newProducts);
  };
  const removeProduct = (id: Item['id']) => {
    const newProducts = products.filter(
      (product) => product.id !== id,
    );
    setProducts(newProducts);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        changeAmount,
        removeProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export const ShopConsumer = ShopContext.Consumer;
export const useShop = () => React.useContext(ShopContext);
